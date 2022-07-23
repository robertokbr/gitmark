import pathConfigs from "./lib/configs/path-configs.cjs";

export default {
  client: 'sqlite3',
  connection: {
    filename: pathConfigs.db,
  },  
  migrations: {
    directory: './lib/database/migrations',
  },
  useNullAsDefault: true,
}