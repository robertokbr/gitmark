import { promisify } from 'util';
import { exec } from 'child_process';

export async function commit(message) {
  const promiseExec = promisify(exec);
  const { stdout, stderr } = await promiseExec(`git commit -m "${message}"`);
  
  if (stderr) {
    console.error(stdout);
    process.exit(1);
  }

  return stdout.split('\n')[0];
}