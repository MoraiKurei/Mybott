module.exports.config = {
  name: 'ai',
  version: '1.1.3',
  hasPermssion: 0,
  credits: 'Deku', //SHORTENED BY YAN MAGLINTE
  description: 'An Ai Chatbot powered by ChatGPT',
  usePrefix: false, //SWITCH TO "true" IF YOU WANT TO ENABLE PREFIX
  commandCategory: 'chatbots',
  usages: 'ai [prompt] (no prefix)',
  cooldowns: 0,
};

module.exports.run = async function({
    api, event, args
}) {
    const axios = require('axios');
    let text = args.join(" ");
    if (!text) {
        return api.sendMessage("❌Missing input!", event.threadID, event.messageID)
    }
    api.sendMessage(`🔍"${text}"`, event.threadID, event.messageID);
    const res = await axios.get(`https://sim.ainz-project.repl.co/others/gpt?prompt=${text}`);
    let data = res.data.result;
    api.sendMessage(data, event.threadID, event.messageID)
}