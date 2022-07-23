import { exec as callbackExec } from 'child_process';
import { promisify } from 'util';

async function main() {
  const exec = promisify(callbackExec);

  const result = await exec('git commit -m "chore: test commit message output"');
  console.log(result.stdout.split('\n')[0]);
}

main();