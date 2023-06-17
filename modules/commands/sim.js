module.exports.config = {
    name: "sim",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "KENLIEPLAYS",
    description: "Talk to sim",
    usePrefix: false,
    commandCategory: "chatbots",
    usages: "[ask]",
    cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("Please type a message...", tid, mid);
    const res = await axios.get(`https://api4free.kenliejugarap.com/sim?lang=en&message=${content}`);
    const respond = res.data.message;
    api.sendMessage(respond, tid, (error, info) => {
        if (error) {
            console.error(error);
        }
    }, mid);
}