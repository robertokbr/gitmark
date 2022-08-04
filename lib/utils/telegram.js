import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TG_BOT_TOKEN);

export function initializeBot() {
  bot.hears('hi', (ctx) => {
    ctx.reply('Here you go your token: ' + ctx.update.message.from.id);
  });

  bot.launch();
}

export async function sendMessage({
  author, 
  commit, 
  note,
  number
}) {
  const message = `-${author}\n${commit}\n${note}`;

  await bot.telegram.sendMessage(number, message);
}