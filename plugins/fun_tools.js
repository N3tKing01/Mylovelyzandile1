
const {
    plugin,
    mode
} = require('../lib');
const { CMD_NAME } = require('../config');

plugin({
    pattern: 'flip ?(.*)',
    desc: 'Flip a coin',
    react: "🪙",
    type: "fun",
    fromMe: mode
}, async (message, match) => {
    try {
        const results = ['Heads', 'Tails'];
        const result = results[Math.floor(Math.random() * results.length)];
        const emoji = result === 'Heads' ? '🟡' : '⚫';
        
        await message.send(`🪙 *Coin Flip Result* 🪙\n\n${emoji} **${result}** ${emoji}\n\n> *${CMD_NAME}*`);
    } catch (error) {
        console.error("❌ Error in .flip command:", error);
        await message.send("❌ *Error occurred while flipping coin.*");
    }
});

plugin({
    pattern: 'fortune ?(.*)',
    desc: 'Get your fortune for today',
    react: "🔮",
    type: "fun",
    fromMe: mode
}, async (message, match) => {
    try {
        const fortunes = [
            "Today will bring you unexpected joy! ✨",
            "A surprise awaits you around the corner 🎁",
            "Your creativity will shine brightly today 🌟",
            "Someone will make you smile today 😊",
            "Good things come to those who wait 🍀",
            "Today is perfect for new beginnings 🌱",
            "Your positive energy will attract good luck 🧿",
            "A message from afar will brighten your day 💌",
            "Today you'll discover something amazing 🔍",
            "Your kindness will come back to you tenfold 💖",
            "Adventure is calling your name today 🗺️",
            "Today brings opportunities for growth 📈",
            "You'll find wisdom in unexpected places 📚",
            "Today your dreams feel closer than ever 🌙",
            "A moment of clarity awaits you today 💡"
        ];
        
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        const sender = `@${message.sender.split("@")[0]}`;
        
        await message.send(`🔮 *Fortune Cookie* 🔮\n\n${sender}, your fortune says:\n\n"${randomFortune}"\n\n> *${CMD_NAME}*`, {
            mentions: [message.sender]
        });
    } catch (error) {
        console.error("❌ Error in .fortune command:", error);
        await message.send("❌ *Error occurred while reading fortune.*");
    }
});

plugin({
    pattern: 'magic8 ?(.*)',
    desc: 'Ask the magic 8-ball a question',
    react: "🎱",
    type: "fun",
    fromMe: mode
}, async (message, match) => {
    try {
        if (!match) {
            return await message.send("🎱 *Magic 8-Ball* 🎱\n\nPlease ask a question!\n\nExample: .magic8 Will I be successful?");
        }

        const responses = [
            "It is certain ✅",
            "It is decidedly so ✅",
            "Without a doubt ✅", 
            "Yes definitely ✅",
            "You may rely on it ✅",
            "As I see it, yes ✅",
            "Most likely ✅",
            "Outlook good ✅",
            "Yes ✅",
            "Signs point to yes ✅",
            "Reply hazy, try again 🔄",
            "Ask again later 🔄",
            "Better not tell you now 🔄",
            "Cannot predict now 🔄",
            "Concentrate and ask again 🔄",
            "Don't count on it ❌",
            "My reply is no ❌",
            "My sources say no ❌",
            "Outlook not so good ❌",
            "Very doubtful ❌"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        await message.send(`🎱 *Magic 8-Ball* 🎱\n\n*Question:* ${match}\n\n*Answer:* ${randomResponse}\n\n> *${CMD_NAME}*`);
    } catch (error) {
        console.error("❌ Error in .magic8 command:", error);
        await message.send("❌ *The magic 8-ball is cloudy, try again later.*");
    }
});

plugin({
    pattern: 'choose ?(.*)',
    desc: 'Let the bot choose between options',
    react: "🤔",
    type: "fun",
    fromMe: mode
}, async (message, match) => {
    try {
        if (!match) {
            return await message.send("🤔 *Choice Maker* 🤔\n\nPlease provide options separated by commas!\n\nExample: .choose pizza, burger, pasta");
        }

        const options = match.split(',').map(option => option.trim()).filter(option => option.length > 0);
        
        if (options.length < 2) {
            return await message.send("🤔 *Choice Maker* 🤔\n\nPlease provide at least 2 options separated by commas!");
        }

        const randomChoice = options[Math.floor(Math.random() * options.length)];
        
        await message.send(`🤔 *Choice Maker* 🤔\n\n*Options:* ${options.join(', ')}\n\n🎯 *I choose:* **${randomChoice}**\n\n> *${CMD_NAME}*`);
    } catch (error) {
        console.error("❌ Error in .choose command:", error);
        await message.send("❌ *Error occurred while making choice.*");
    }
});

plugin({
    pattern: 'compliment ?(.*)',
    desc: 'Give someone a compliment',
    react: "🌟",
    type: "fun",
    fromMe: mode
}, async (message, match) => {
    try {
        let mentionedUser = message.mention[0] || (message.reply_message && message.reply_message.sender);
        let sender = `@${message.sender.split("@")[0]}`;
        
        const compliments = [
            "You're absolutely amazing! ✨",
            "You light up every room you enter! 🌟",
            "Your smile is contagious! 😊",
            "You're incredibly talented! 🎯",
            "You have such a kind heart! 💖",
            "You're really inspiring! 🌈",
            "You're one of a kind! 🦄",
            "You make everything better! ☀️",
            "You're simply wonderful! 🌸",
            "You're a true gem! 💎",
            "You're incredibly creative! 🎨",
            "You have great energy! ⚡",
            "You're really special! 🌟",
            "You're absolutely fantastic! 🎉",
            "You brighten everyone's day! 🌞"
        ];
        
        const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
        
        let msg = mentionedUser
            ? `${sender} says to @${mentionedUser.split("@")[0]}: "${randomCompliment}"`
            : `${sender}, ${randomCompliment}`;

        await message.send(`🌟 *Compliment Corner* 🌟\n\n${msg}\n\n> *${CMD_NAME}*`, {
            mentions: [message.sender, mentionedUser].filter(Boolean)
        });
    } catch (error) {
        console.error("❌ Error in .compliment command:", error);
        await message.send("❌ *Error occurred while giving compliment.*");
    }
});
