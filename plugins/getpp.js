const { cmd } = require("../plugin");

plugin({
  pattern: "getpp",
  alias: [],
  use: "pp",
  desc: "Get profile picture of a user (replied user in group, or DM user)",
  category: "tools",
  react: "🖼️",
  filename: __filename
},
async (conn, mek, m, { from, sender, reply, isGroup }) => {
  try {
    const quotedMsg = mek.message?.extendedTextMessage?.contextInfo?.participant;
    const quotedKey = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    let targetJid;

    if (isGroup) {
      if (quotedMsg && quotedKey) {
        targetJid = quotedMsg;
      } else {
        return reply("❌ Please reply to someone's message to get their profile picture.");
      }
    } else {
      targetJid = from.endsWith("@s.whatsapp.net") ? from : sender;
    }

    let imageUrl;
    try {
      imageUrl = await conn.profilePictureUrl(targetJid, 'image');
    } catch {
      imageUrl = "https://files.catbox.moe/adymbp.jpg";
    }

    const fakeVCard = {
      key: {
        fromMe: false,
        participant: '0@s.whatsapp.net',
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "𝚃𝙴𝙲𝙷-𝚂𝚄𝙿𝙿𝙾𝚁𝚃-𝚃𝙴𝙻𝙺  ✅",
          vcard: "BEGIN:VCARD\nVERSION:𝟺.0\nFN: Brealmd ✅\nORG: 𝙻𝙳𝚃;\nTEL;type=CELL;type=VOICE;waid=26300000000:+263 700 000000\nEND:VCARD",
          jpegThumbnail: Buffer.from([])
        }
      }
    };

    await conn.sendMessage(from, {
      image: { url: imageUrl },
      caption: `🖼️ Profile Picture of @${targetJid.split('@')[0]}`,
      contextInfo: {
        mentionedJid: [targetJid],
        forwardingScore: 5,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: "𝙱𝚁𝙴𝙰𝙻-&-𝙱𝙾𝚈𝙺𝙰",
          newsletterJid: "120363347365643318@newsletter"
        }
      }
    }, { quoted: fakeVCard });

  } catch (err) {
    console.error("Error in getpp:", err);
    reply("❌ Failed to fetch profile picture.");
  }
});
      
