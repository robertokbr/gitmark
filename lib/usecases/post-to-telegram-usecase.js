import { sendMessage } from "../utils/telegram.js";

export class PostToTelegramUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ commit, note }) {
    const user = await this.usersRepository.find();

    if (!user || !user.telegram_number) {
      console.error(
        '[error] you must set your telegram setup by running:' +
        '\ngm -t "<telegram-number>"',
      );

      process.exit(1);
    }

    await sendMessage({
      number: user.telegram_number,
      author: user.name,
      commit,
      note,
    })
  }
}