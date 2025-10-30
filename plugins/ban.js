const { plugin, personalDB, isBot } = require('../lib');

plugin({
    pattern: 'ban ?(.*)',
    desc: 'deactivate bot in specified jid',
    type: 'owner',
    root: true
}, async (message, match) => {
if (!await isBot(message)) {
			return await sendResponse(message, '*_Only bot owner and group admins can use this command_*');
}

    const { ban } = await personalDB(['ban'], { content: {} }, 'get');

    if (ban && ban.includes(message.jid)) {
        return await message.send("_already deactivated bot in this jid!_");
    }

    const update = ban ? ban + ',' + message.jid : message.jid;
    await personalDB(['ban'], { content: update }, 'set');

    await message.send('*✅ Bot deactivated in this jid⚫️*');
    process.exit(0);
});

plugin({
    pattern: 'unban ?(.*)',
    desc: 'activate bot in deactivated bot jid',
    type: 'owner',
    root: true
}, async (message, match) => {
   if (!await isBot(message)) {
			return await sendResponse(message, '*_Only bot owner and group admins can use this command_*');
   }

    const { ban } = await personalDB(['ban'], { content: {} }, 'get');

    if (!ban) return await message.send("_bot is not disabled in any jid_");
    if (!ban.includes(message.jid)) return await message.send("_bot not deactivated in this jid_");

    let update = [];
    ban.split(',').map(a => {
        if (a != message.jid) update.push(a);
    });

    await personalDB(['ban'], { content: update.join(",") }, 'set');
    await message.send('*✅ Bot activated in this jid*\n*restarting!*');
    process.exit(0);
});