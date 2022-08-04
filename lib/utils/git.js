import { promisify } from 'util';
import { exec } from 'child_process';

const promiseExec = promisify(exec);

export async function commit(message) {
  const { stdout, stderr } = await promiseExec(`git commit -m "${message}"`);
  
  if (stderr) {
    console.error(stdout);
    process.exit(1);
  }

  return stdout.split('\n')[0];
}

export async function getUsername() {
  const { stdout, stderr } = await promiseExec('git config --get user.name');

  if (stderr) {
    console.error(stdout);
    process.exit(1);
  }

  return stdout.trim();
}

export async function getRepoName() {
  const { stdout, stderr } = await promiseExec('git config --get remote.origin.ur');

  if (stderr) return;

  return stdout.trim();
}