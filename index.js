const login = require;
__path = process.cwd();
const fs = require("fs");
const axios = require("axios");
const { spawn } = require("child_process"); // Add this line
const { keep_alive } = require(__path + "/uptime.js");
const configs = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
const prefix = configs.PREFIX;
const admin = configs.ADMINBOT;
const ENDPOINT = configs.ENDPOINT;
const botname = configs.BOTNAME;

// ...

const express = require("express");
const app = express();
const logger = require("./utils/log.js");
const path = require('path');
const PORT = process.env.PORT || 8080 || 8888 || 9999;
// ...

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/includes/login/cover/index.html"));
});

startBot(0);

async function startBot(index) {
  logger(`Starting child process ${index}`, "STARTER");
  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      CHILD_INDEX: index,
    },
  });

  app.listen(PORT, () => {
    logger.loader(`Bot is running on port: ${PORT}`);
  });

  child.on("close", async (codeExit) => {
    if (codeExit !== 0) {
      await startBot(index);
      return;
    }
  });

  child.on("error", (error) => {
    logger(`An error occurred: ${JSON.stringify(error)}`, "START");
  });
  }
