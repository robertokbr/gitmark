import { connection } from "../database/index.js";

export default class UsersRepository {
  /**
   * @param {typeof connection} connection
   */
  constructor(connection) {
    this.dbClient = connection('users');
  }

  async create(userName) {
    const user = await this.find();

    if (user) {
      if (user.name === userName) return user;
      
      await this.dbClient.where({ 
        name: user.name 
      }).update({ name: userName });

      return {...user, name: userName};
    }

    const data = { 
      name: userName, 
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    await this.dbClient.insert(data);

    return data;
  }

  async find() {
    return connection.first('*').from('users');
  }
}