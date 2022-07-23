import fs from 'fs';
import pathConfigs from '../configs/path-configs.cjs';

export async function postNote(note) {
  const content = await fs.promises.readFile(pathConfigs.notes, 'utf8');
  await fs.promises.writeFile(pathConfigs.notes, content + '\n\n' + note, 'utf8');
}