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
const info = chalk.keyword('green');

// 版本控制
async function version(versionType, tagType) {
  const { stdout, stderr } = await exec(
    `npm version ${versionType} ${tagType ? `--preid=${tagType}` : ''} --no-git-tag-version`
  );
  if (stderr) throw stderr;
  console.log(info(`版本升级到：${stdout.trim()}`));
  return stdout;
}

// 分支管理
async function branch() {
  const { stdout, stderr } = await exec(`git rev-parse --abbrev-ref HEAD`);
  if (stderr) throw stderr;
  console.log(info(`当前发版分支为：${stdout.trim()}`));
  return stdout;
}

// 本地构建
async function build() {
  const { stdout, stderr } = await exec(`npm run build`);
  if (stderr) throw stderr;
  console.log(info(`本地构建完成！`));
  return stdout;
}

// 发布
async function publish(tagType) {
  const { stdout, stderr } = await exec(`npm publish ${tagType ? '--tag beta' : ''}`);
  if (stderr) throw stderr;
  console.log(info(`当前发版分支为：${stdout.trim()}`));
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
      throw new Error('发布beta版本请切换到test分支！');
    }
    // release/v0分支限定发布latest
    if (latVersions.includes(versionType) && !tagType && currentBranch.trim() != 'release/v0') {
      throw new Error('发布稳定版本请切换到release/v0分支！');
    }

    const npmVersion = await version(versionType, tagType);

    await spawn('git', ['add', 'package.json', 'package-lock.json'], { stdio: 'inherit' });
    await spawn('git', ['commit', '-m', npmVersion.trim()], { stdio: 'inherit' });

    // 发布稳定版才进行标签
    if (latVersions.includes(versionType)) {
      await spawn('git', ['tag', npmVersion.trim()], { stdio: 'inherit' });
      await spawn('git', ['push', 'origin', npmVersion.trim()], { stdio: 'inherit' });
    }
    await spawn('git', ['status'], { stdio: 'inherit' });
    await spawn('git', ['push', 'origin', currentBranch.trim()], { stdio: 'inherit' });

    await build();

    await publish();
  } catch (err) {
    console.log(error(`出错了： ${err.message}`));
    process.exit(1);
  }
};

run();
