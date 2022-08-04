import commandLineArgs from 'command-line-args';
import { checkIsDBInitialized, initializeDB } from "./utils/db.js";
import UsersRepository from "./repositories/users-repository.js";
import { argConfigs } from "./configs/arg-configs.js";
import { commit } from "./utils/git.js";
import { PostToTelegramUseCase } from './usecases/post-to-telegram-usecase.js';

async function main() {
  const options = commandLineArgs(argConfigs.definitions);

  if (options.path) {
    console.info(process.cwd());
    process.exit(0);
  }

  if (!checkIsDBInitialized()) {
    await initializeDB();

    console.info('Welcome to GM!\nTo get started, run gm -t "<telegram-code>"');
    process.exit(0);
  }

  const usersRepository = new UsersRepository();

  if (options.telegram) {
    await usersRepository.upsert({ telegram_number: options.telegram });

    console.info(
      `Welcome ${user.name}!\nTo create a gitmark, run gm -m "<git-commit-message>" -n "<note>"`
    );

    process.exit(0);
  }

  const user = await usersRepository.find();

  if (!user) {
    console.info('To get started, run gm -t "<telegram-code>"');
    process.exit(0);
  }

  if (options.message && options.note) {
    const commitData = await commit(options.message);
    const postToTelegramUsecase = new PostToTelegramUseCase(usersRepository);
    await postToTelegramUsecase.execute({ commit: commitData, note: options.note });
    process.exit(0);
  }
}

export default { main }; 
