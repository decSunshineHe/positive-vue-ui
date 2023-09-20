#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
'use strict';

const util = require('util');
const childProcess = require('child_process');
const chalk = require('chalk');

const exec = util.promisify(childProcess.exec);
const spawn = childProcess.spawnSync;
const error = chalk.bold.red;

async function version(versionType, tagType) {
  const { stdout, stderr } = await exec(
    `npm version ${versionType} ${tagType ? `--preid=${tagType}` : ''} --no-git-tag-version`
  );
  if (stderr) throw stderr;
  return stdout;
}

async function branch() {
  const { stdout, stderr } = await exec(`git rev-parse --abbrev-ref HEAD`);
  if (stderr) throw stderr;
  return stdout;
}

const run = async () => {
  try {
    const versionType = process.argv[2];
    const tagType = process.argv[3];

    const latVersions = ['patch', 'minor', 'major'];
    const preVersions = ['prepatch', 'preminor', 'premajor', 'prerelease'];

    // 当前分支
    const currentBranch = await branch();

    // test分支限定发布beta
    if (preVersions.includes(versionType) && tagType && currentBranch.trim() !== 'test') {
      throw new Error('publish beta please checkout branch to test');
    }
    // release/v0分支限定发布latest
    if (latVersions.includes(versionType) && !tagType && currentBranch.trim() != 'release/v0') {
      throw new Error('publish latest please checkout branch to release/v0');
    }

    const npmVersion = await version(versionType, tagType);

    await spawn('git', ['add', 'package.json', 'package-lock.json'], { stdio: 'inherit' });
    await spawn('git', ['commit', '-m', npmVersion.trim()], { stdio: 'inherit' });
    // 发布稳定版才进行标签
    if (latVersions.includes(versionType)) {
      await spawn('git', ['tag', npmVersion.trim()], { stdio: 'inherit' });
    }
    await spawn('git', ['status'], { stdio: 'inherit' });
    await spawn('git', ['push', 'origin', currentBranch.trim()], { stdio: 'inherit' });
  } catch (err) {
    console.log(error(`Something went wrong: ${err.message}`));
  }
};

run();
