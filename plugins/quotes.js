const {
    plugin,
    mode
} = require('../lib');
const axios = require('axios');
const { CMD_NAME } = require('../config');
// Configure axios timeout
const axiosConfig = {
    timeout: 10000 // 10 seconds timeout
};

// Enhanced error handling
const handleCommandError = (error, commandName) => {
    console.error(`❌ Error in ${commandName} command:`, error);
    let errorMsg = `❌ *${commandName} command failed*\n\n`;
    if (error.code === 'JOSHKABORTED') {
        errorMsg += `⏰ Request timed out. Please try again.`;
    } else if (error.response && error.response.status >= 500) {
        errorMsg += `🔧 Server error. Please try again later.`;
    } else {
        errorMsg += `🔧 ${error.message || 'Please try again later.'}`;
    }
    errorMsg += `\n\n> *${CMD_NAME}*`;
    return errorMsg;
};

plugin({
    pattern: 'quote ?(.*)',
    desc: 'Get an inspirational quote',
    react: "💭",
    type: "fun",
    fromMe: mode
}, async (message, match) => {
    try {
        let sender = `@${message.sender.split("@")[0]}`;

        const apiUrl = "https://api.quotable.io/random";
        let res = await axios.get(apiUrl, axiosConfig);
        let quoteData = res.data;

        if (quoteData && quoteData.content && quoteData.author) {
            let quoteText = `💭 *INSPIRATIONAL QUOTE* 💭\n\n`;
            quoteText += `"${quoteData.content}"\n\n`;
            quoteText += `✍️ *Author:* ${quoteData.author}\n`;
            quoteText += `📚 *Length:* ${quoteData.length} characters\n`;
            if (quoteData.tags && quoteData.tags.length > 0) {
                quoteText += `🏷️ *Tags:* ${quoteData.tags.join(', ')}\n`;
            }
            quoteText += `\n> *${CMD_NAME}*`;

            await message.send(quoteText, { mentions: [message.sender] });
        } else {
            throw new Error('No quote data received');
        }
    } catch (error) {
        await message.send(handleCommandError(error, '.quote'));
    }
});

plugin({
    pattern: 'motivate ?(.*)',
    desc: 'Get a motivational quote',
    react: "💪",
    type: "fun",
    fromMe: mode
}, async (message, match) => {
    try {
        const apiUrl = "https://api.quotable.io/random?tags=motivational";
        let res = await axios.get(apiUrl, axiosConfig);
        let quoteData = res.data;

        if (quoteData && quoteData.content && quoteData.author) {
            let quoteText = `💪 *MOTIVATION BOOST* 💪\n\n`;
            quoteText += `"${quoteData.content}"\n\n`;
            quoteText += `🌟 *Author:* ${quoteData.author}\n`;
            quoteText += `🚀 *Power Level:* Maximum\n`;
            quoteText += `💯 *Motivation Score:* ${Math.floor(Math.random() * 20) + 81}/100\n\n`;
            quoteText += `> *${CMD_NAME}*`;

            await message.send(quoteText, { mentions: [message.sender] });
        } else {
            throw new Error('No motivational quote data received');
        }
    } catch (error) {
        await message.send(handleCommandError(error, '.motivate'));
    }
});

plugin({
    pattern: 'wisdom ?(.*)',
    desc: 'Get wise words and life advice',
    react: "🦉",
    type: "fun",
    fromMe: mode
}, async (message, match) => {
    try {
        const wisdomQuotes = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Life is what happens to you while you're busy making other plans. - John Lennon",
            "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
            "It is during our darkest moments that we must focus to see the light. - Aristotle",
            "The only impossible journey is the one you never begin. - Tony Robbins",
            "In the end, we will remember not the words of our enemies, but the silence of our friends. - Martin Luther King Jr.",
            "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
            "A person who never made a mistake never tried anything new. - Albert Einstein",
            "The way to get started is to quit talking and begin doing. - Walt Disney",
            "Don't let yesterday take up too much of today. - Will Rogers",
            "You learn more from failure than from success. Don't let it stop you. Failure builds character. - Unknown",
            "Be yourself; everyone else is already taken. - Oscar Wilde",
            "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe. - Albert Einstein",
            "You only live once, but if you do it right, once is enough. - Mae West",
            "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind. - Bernard M. Baruch"
        ];

        let randomWisdom = wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)];

        let wisdomText = `🦉 *WORDS OF WISDOM* 🦉\n\n`;
        wisdomText += `${randomWisdom}\n\n`;
        wisdomText += `📖 *Wisdom Level:* Ancient\n`;
        wisdomText += `🎓 *Life Lessons:* Unlimited\n`;
        wisdomText += `✨ *Truth Factor:* 100%\n\n`;
        wisdomText += `> *${CMD_NAME}*`;

        await message.send(wisdomText, { mentions: [message.sender] });
    } catch (error) {
        await message.send(handleCommandError(error, '.wisdom'));
    }
});

plugin({
    pattern: 'love ?(.*)',
    desc: 'Get romantic and love quotes',
    react: "💕",
    type: "fun",
    fromMe: mode
}, async (message, match) => {
    try {
        const loveQuotes = [
            "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage. - Lao Tzu",
            "We accept the love we think we deserve. - Stephen Chbosky",
            "You know you're in love when you can't fall asleep because reality is finally better than your dreams. - Dr. Seuss",
            "The best thing to hold onto in life is each other. - Audrey Hepburn",
            "Love is not about how many days, months, or years you have been together. It's about how much you love each other every single day. - Unknown",
            "I have found the paradox, if you love until it hurts, there can be no more hurt, only more love. - Mother Teresa",
            "Love is composed of a single soul inhabiting two bodies. - Aristotle",
            "Where there is love there is life. - Mahatma Gandhi",
            "The greatest happiness of life is the conviction that we are loved. - Victor Hugo",
            "Love doesn't make the world go round. Love is what makes the ride worthwhile. - Franklin P. Jones"
        ];

        let randomLove = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];

        let loveText = `💕 *LOVE QUOTE* 💕\n\n`;
        loveText += `${randomLove}\n\n`;
        loveText += `💖 *Romance Level:* Maximum\n`;
        loveText += `🌹 *Sweetness:* 100%\n`;
        loveText += `💘 *Heart Rating:* ❤️❤️❤️❤️❤️\n\n`;
        loveText += `> *${CMD_NAME}*`;

        await message.send(loveText, { mentions: [message.sender] });
    } catch (error) {
        await message.send(handleCommandError(error, '.love'));
    }
});