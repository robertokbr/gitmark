import fs from 'fs';
import pathConfigs from '../configs/path-configs.cjs';
import { Client } from "@notionhq/client";

export async function createNote({ 
  author, 
  database, 
  commit, 
  note, 
}) {
  const content = await fs.promises.readFile(pathConfigs.notes, 'utf8');
  await fs.promises.writeFile(pathConfigs.notes, content + '\n\n' + note, 'utf8');

  try {
    const notion = new Client({
      auth: 'secret_uWpbocgDMZNpOh3RAPJarfpBZHXQA0Wh8rgB7tL8mqo',
    })

    const response = await notion.pages.create({
      parent: { database_id: database },
      properties: {
        title: { 
          title:[
            {
              "text": {
                "content": note
              }
            }
          ],
        },
      },
    })

    console.log(response)
  } catch(error) {
    console.log(error);
  }
}