module.exports.config = {
	name: "help",
	version: "1.1.5",
	hasPermssion: 0,
	credits: "Yan Maglinte",
	description: "Sends list of Commands",
  usePrefix: true,
	usages: "Help Command",
	commandCategory: "Info",
	cooldowns: 5
};

module.exports.handleReply = async function({
    api
    , event
    , handleReply
}) {
    let num = parseInt(event.body.split(" ")[0].trim());
    (handleReply.bonus) ? num -= handleReply.bonus: num;
    let msg = "";
    let data = handleReply.content;
    let check = false;
    if (isNaN(num)) msg = "⚠️The number you selected is not in the list, please try again.\n«•-----------------------------------•»";
    else if (num > data.length || num <= 0) msg = "⚠️The number you selected is not in the list, please try again.\n«•-----------------------------------•»";
    else {
        const {
            commands
        } = global.client;
        let dataAfter = data[num -= 1];
        if (handleReply.type == "cmd_info") {
            let command_config = commands.get(dataAfter)
                .config;
            msg += `༺${command_config.commandCategory.toUpperCase()}༻\n«•-----------------------------------•»\n`;
            msg += `\n➣ Command name:\n ${dataAfter}`;
            msg += `\n➣ Description:\n ${command_config.description}`;
            msg += `\n➣ usePrefix: ${command_config.usePrefix}`;
            msg += `\n➣ Usage:\n ${(command_config.usages) ? command_config.usages : ""}`;
            msg += `\n➣ Cooldown:\n ${command_config.cooldowns || 5}s`;
            msg += `\n➣ Has Permission:\n ${(command_config.hasPermssion == 0) ? "User" : (command_config.hasPermssion == 1) ? "Group administrator" : "Bot admin"}`;
            msg += ``
            msg += `\n\n«•-----------------------------------•»`;
        } else {
            check = true;
            let count = 0;
            msg += `༺${dataAfter.group.toUpperCase()}༻\n`;

            dataAfter.cmds.forEach(item => {
                msg += `\n 【${count+=1}】 ➣ ${item}:\n ${commands.get(item).config.description}\n`;
            })
            msg += "\n«•-----------------------------------•»\n༺CHOOSE A NUMBER AND REPLY TO THIS MESSAGE༻";
        }
    }
    const axios = require('axios');
    const fs = require('fs-extra');
    const img = [
      "https://i.postimg.cc/KzsW3Wzr/images-86.jpg",
      "https://i.postimg.cc/fLXHkRGZ/c113eb0f980f3e8ee44c1421159dd71cfa6a0950.jpg",
      "https://i.postimg.cc/d0Z6S0td/create-fast-and-awesome-ai-art-with-midjourney-based-on-your-words.jpg"
    ]
    var path = __dirname + "/cache/menu.png"
    var rdimg = img[Math.floor(Math.random() * img.length)];
    const imgP = []
    let dowloadIMG = (await axios.get(rdimg, {
            responseType: "arraybuffer"
        }))
        .data;
    fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8"));
    imgP.push(fs.createReadStream(path))
    var msgg = {
        body: msg
        , attachment: imgP
    }
    api.unsendMessage(handleReply.messageID);
    return api.sendMessage(msgg, event.threadID, (error, info) => {
        if (error) console.log(error);
        if (check) {
            global.client.handleReply.push({
                type: "cmd_info"
                , name: this.config.name
                , messageID: info.messageID
                , content: data[num].cmds
            })
        }
    }, event.messageID);
}

module.exports.run = async function({
    api
    , event
    , args
}) {
    const {
        commands
    } = global.client;
    const {
        threadID
        , messageID
    } = event;
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    const axios = require('axios');
    const fs = require('fs-extra');
    const imgP = []
    const img = [
      "https://i.postimg.cc/KzsW3Wzr/images-86.jpg",
      "https://i.postimg.cc/fLXHkRGZ/c113eb0f980f3e8ee44c1421159dd71cfa6a0950.jpg",
      "https://i.postimg.cc/d0Z6S0td/create-fast-and-awesome-ai-art-with-midjourney-based-on-your-words.jpg"
    ]
    var path = __dirname + "/cache/menu.png"
    var rdimg = img[Math.floor(Math.random() * img.length)];

    let dowloadIMG = (await axios.get(rdimg, {
            responseType: "arraybuffer"
        }))
        .data;
    fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8"));
    imgP.push(fs.createReadStream(path))
    const command = commands.values();
    var group = []
        , msg = "༺COMMANDS༻\n«•-----------------------------------•»\n";
    let check = true
        , page_num_input = "";
    let bonus = 0;

    for (const commandConfig of command) {
        if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({
            group: commandConfig.config.commandCategory.toLowerCase()
            , cmds: [commandConfig.config.name]
        });
        else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())
            .cmds.push(commandConfig.config.name);
    }

    if (args[0] && ["all", "-a"].includes(args[0].trim())) {
        let all_commands = [];
        group.forEach(commandGroup => {
            commandGroup.cmds.forEach(item => all_commands.push(item));
        });
        let page_num_total = Math.ceil(all_commands.length / 2222222222);
        if (args[1]) {
            check = false;
            page_num_input = parseInt(args[1]);
            if (isNaN(page_num_input)) msg = "⚠️Error! Please try again by typing /help";
            else if (page_num_input > page_num_total || page_num_input <= 0) msg = "⚠️The number you selected is not in the list, please try again";
            else check = true;
        }
        if (check) {
            index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
            bonus = index_start;
            index_end = (index_start + 2222222222 > all_commands.length) ? all_commands.length : index_start + 2222222222;
            all_commands = all_commands.slice(index_start, index_end);
            all_commands.forEach(e => {
                msg += `\n【${index_start+=1}】${e}:\n${commands.get(e).config.description}\n`;
            })
            msg += ``;
            msg += ``;
            msg += ``
            msg += "Reply to this message by number to see command details and how to use command";
        }
        var msgg = {
            body: msg
            , attachment: imgP
        }
        return api.sendMessage(msgg, threadID, (error, info) => {
            if (check) {
                global.client.handleReply.push({
                    type: "cmd_info"
                    , bonus: bonus
                    , name: this.config.name
                    , messageID: info.messageID
                    , content: all_commands
                })
            }
        }, messageID)
    }

    let page_num_total = Math.ceil(group.length / 2222222222);
    if (args[0]) {
        check = false;
        page_num_input = parseInt(args[0]);
        if (isNaN(page_num_input)) msg = `⚠️Error! Please try again by typing ${global.config.PREFIX}help`;
        else if (page_num_input > page_num_total || page_num_input <= 0) msg = "⚠️The number you selected is not in the list, please try again";
        else check = true;
    }
    if (check) {
        index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
        bonus = index_start;
        index_end = (index_start + 2222222222 > group.length) ? group.length : index_start + 2222222222;
        group = group.slice(index_start, index_end);
        group.forEach(commandGroup => msg += `\n【${index_start+=1}】 ➣ ${commandGroup.group.toUpperCase()}\n`);
        msg += ``;
        msg += ``;
        msg += ``
        msg += `\n«•-----------------------------------•»\n༺CHOOSE A NUMBER AND REPLY TO THIS MESSAGE༻`;
    }
    var msgg = {
        body: msg
        , attachment: imgP
    }
    return api.sendMessage(msgg, threadID, async (error, info) => {
        global.client.handleReply.push({
            name: this.config.name
            , bonus: bonus
            , messageID: info.messageID
            , content: group
        })
    });
}