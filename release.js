#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
'use strict';

const util = require('util');
const childProcess = require('child_process');

const exec = util.promisify(childProcess.exec);
const spawn = childProcess.spawnSync;

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

    if (versionType !== 'patch' && versionType !== 'minor' && versionType !== 'major' && versionType !== 'prerelease')
      throw new Error('You need to specify npm version! [patch|minor|major]');

    // 当前分支
    const currentBranch = await branch();

    if (tagType === 'beta' && currentBranch.trim() !== 'test') {
      throw new Error('publish beta please checkout branch to test');
    }
    if (tagType !== 'beta' && currentBranch.trim() != 'release/v0') {
      throw new Error('publish latest please checkout branch to release/v0');
    }

    const npmVersion = await version(versionType, tagType);

    await spawn('git', ['add', 'package.json', 'package-lock.json'], { stdio: 'inherit' });
    await spawn('git', ['commit', '-m', npmVersion.trim()], { stdio: 'inherit' });
    // 发布稳定版才进行标签
    if (['patch', 'minor', 'major'].some(versionType)) {
      await spawn('git', ['tag', npmVersion.trim()], { stdio: 'inherit' });
    }
    await spawn('git', ['status'], { stdio: 'inherit' });

    await spawn('git', ['push', 'origin', currentBranch.trim()], { stdio: 'inherit' });
  } catch (err) {
    console.log('Something went wrong:');
    console.error(err.message);
    console.error('\nPlease use this format: \nnpm run commit [patch|minor|major] "Commit message"');
  }
};

run();
