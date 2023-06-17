module.exports.config = {
    name: "joinNoti"
    , eventType: ["log:subscribe"]
    , version: "1.0.1"
    , credits: "Yan Maglinte"
    , description: "This command notifies the bot when people enter or leave the group chat."
    , dependencies: {
        "fs-extra": ""
    }
};

module.exports.run = async function({
    api
    , event
}) {

    const request = require("request");
    const {
        threadID
    } = event;
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`【𝗕𝗢𝗧】
        ${global.config.BOTNAME} ❯${global.config.PREFIX}`, threadID, api.getCurrentUserID());
        return api.sendMessage(`${global.config.BOTNAME} "Connection successful!"\nNow, you can use the bot in your group chat.\n\nHere's my prefix: ${global.config.PREFIX}\nType ${global.config.PREFIX}help to see list of my features.`, threadID);
    } else {
        try {
            const request = require("request");
            const fs = global.nodemodule["fs-extra"];
            let {
                threadName
                , participantIDs
            } = await api.getThreadInfo(threadID);

            const threadData = global.data.threadData.get(parseInt(threadID)) || {};

            var mentions = []
                , nameArray = []
                , memLength = []
                , i = 0;

            let addedParticipants1 = event.logMessageData.addedParticipants;
            for (let newParticipant of addedParticipants1) {
                let userID = newParticipant.userFbId
                api.getUserInfo(parseInt(userID), (err, data) => {
                    if (err) {
                        return console.log(err)
                    }
                    var obj = Object.keys(data);
                    var userName = data[obj].name.replace("@", "");
                    if (userID !== api.getCurrentUserID()) {

                        nameArray.push(userName);
                        mentions.push({
                            tag: userName
                            , id: userID
                            , fromIndex: 0
                        });

                        memLength.push(participantIDs.length - i++);
                        memLength.sort((a, b) => a - b);

                        (typeof threadData.customJoin == "undefined") ? msg = "Hello {YourName}\nWelcome to\n{threadName}\nyou're the {soThanhVien}th member on this group please enjoy": msg = threadData.customJoin;
                        msg = msg
                            .replace(/\{YourName}/g, nameArray.join(', '))
                            .replace(/\{type}/g, (memLength.length > 1) ? 'you' : 'Friend')
                            .replace(/\{soThanhVien}/g, memLength.join(', '))
                            .replace(/\{threadName}/g, threadName);

                        var link = [
                            "https://i.ibb.co/C2kp7yJ/Picsart-23-06-11-11-39-07-260.jpg"
                            , "https://i.ibb.co/HCcNCjC/Picsart-23-06-11-11-42-35-231.jpg"
                            , "https://i.ibb.co/G935QHj/Picsart-23-06-11-11-47-03-495.jpg"
                        , ];
                        var callback = () => api.sendMessage({
                            body: msg
                            , attachment: fs.createReadStream(__dirname + "/cache/join/avt.jpg")
                            , mentions
                        }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/join/avt.jpg"));
                        return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
                            .pipe(fs.createWriteStream(__dirname + "/cache/join/avt.jpg"))
                            .on("close", () => callback());
                    }
                })
            }
        } catch (err) {
            return console.log("ERROR: " + err);
        }
    }
}