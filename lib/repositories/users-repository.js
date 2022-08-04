import { connection } from "../database/index.js";
import { getUsername } from "../utils/git.js";

export default class UsersRepository {
  constructor() {
    this.dbClient = connection('users');
  }

  async upsert({ 
    notion_api_key, 
    notion_database_id,
    telegram_number
  }) {
    const dto = {
      notion_api_key, 
      telegram_number,
      notion_database_id,
    }

    const user = await this.find();

    if (user) {
      await this.dbClient.where({ id: user.id }).update(dto);

      return {...user, ...dto };
    }

    const usernamme = await getUsername();

    const data = { 
      ...dto,
      name: usernamme, 
      id: Date.now().toString(),
      created_at: new Date(),
    };

    await this.dbClient.insert(data);

    return data;
  }

  async find() {
    return connection.first('*').from('users');
  }
}