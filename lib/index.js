import { connection } from "./database/index.js";
import commandLineArgs from 'command-line-args';
import { checkIsDBInitialized, initializeDB } from "./utils/db.js";
import UsersRepository from "./repositories/users-repository.js";
import { argConfigs } from "./configs/arg-configs.js";
import { postNote } from "./utils/notion.js";
import { commit } from "./utils/git.js";

async function main() {
  const options = commandLineArgs(argConfigs.definitions);

  if (options.path) {
    console.info(process.cwd());
    process.exit(0);
  }

  if (!checkIsDBInitialized()) {
    await initializeDB();

    console.info('Welcome to GM!\nTo get started, run gm -u "<username>"');
    process.exit(0);
  }

  const usersRepository = new UsersRepository(connection);

  let user;

  if (options.username) {
    user = await usersRepository.create(options.username);

    console.info(
      `Welcome ${user.name}!\nTo create a gitmark, run gm -m "<git-commit-message>" -n "<note>"`
    );

    process.exit(0);
  }

  user = await usersRepository.find();

  if (!user) {
    console.info('To get started, run gm -u "<username>"');
    process.exit(0);
  }

  const commitData = await commit(options.message);
  await postNote(commitData + ':\n' + options.note);

  process.exit(0);
}

export default { main }; 
