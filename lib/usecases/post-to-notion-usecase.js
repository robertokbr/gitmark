import { createNote } from "../utils/notion";

export class PostToNotionUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ commit, note }) {
    const user = await this.usersRepository.find();

    if (!user || !user.notion_api_key|| !user.notion_database_id) {
      console.error(
        '[error] you must set your notion setup by running:' +
        '\ngm -k "<notion-api-key>" -d "<notion-database-id>"',
      );

      process.exit(1);
    }

    await createNote({
      note: note,
      commit: commit,
      author: user.name,
      database: user.notion_database_id,
    });
  }
}