import { exec as callbackExec } from 'child_process';
import { promisify } from 'util';

async function main() {
  const exec = promisify(callbackExec);

  const result = await exec('git commit -m "first commit 🚀"');
  console.log(result.stdout);
}

main();