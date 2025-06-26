const { Telegraf } = require("telegraf");
const config = require("./config.json");


const bot = new Telegraf(config.BOT_TOKEN);


bot.start((ctx) => {
  ctx.reply(`👋 Hello ${ctx.from.first_name}!\nI am ${config.BOT_USERNAME}.\nUse ${config.PREFIX}help to view commands.`);
});


bot.command("help", (ctx) => {
  ctx.reply(` Commands:
${config.PREFIX}start - Start the bot
${config.PREFIX}help - Show this message
${config.PREFIX}owner - Show owner info
${config.PREFIX}ping - Check bot response`);
});


bot.command("owner", (ctx) => {
  ctx.reply(`👑 Bot Owner:\n@${config.OWNER_USERNAME}\n🆔 ID: ${config.OWNER_ID}`);
});


bot.command("ping", async (ctx) => {
  const start = Date.now();
  const message = await ctx.reply("🏓 Pinging...");
  const end = Date.now();
  ctx.telegram.editMessageText(
    ctx.chat.id,
    message.message_id,
    null,
    `✅ Ping! ${end - start}ms`
  );
});


bot.on("text", (ctx) => {
  const msg = ctx.message.text;
  if (msg.startsWith(config.PREFIX)) {
    const cmd = msg.split(" ")[0].slice(1);
    ctx.reply(`❌ Unknown command: ${cmd}\nUse ${config.PREFIX}help to see available commands.`);
  }
});

// Start the bot
bot.launch().then(() => {
  console.log(`🤖 ${config.BOT_USERNAME} is now running! Logged in as owner: @${config.OWNER_USERNAME}`);
});
