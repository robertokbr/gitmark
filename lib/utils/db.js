import fs from 'fs';
import { promisify } from 'util';
import { exec } from 'child_process';
import pathConfigs from '../configs/path-configs.cjs';

export function checkIsDBInitialized() {
  return fs.existsSync(pathConfigs.db);
}

export async function initializeDB() {
  const promiseExec = promisify(exec);
  const { stderr } = await promiseExec('npm run migration:run');

  if (stderr) {
    console.error('[error] execution failed due to: ' + stdout);
    process.exit(1);
  }
}