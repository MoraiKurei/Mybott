const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
__path = process.cwd();
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log.js");
const request = require('request');
const express = require("express");
const fs = require("fs")
const router = express.Router();
const configs = JSON.parse(fs.readFileSync(__path+'/config.json', 'utf8'))
const ENDPOINT = configs.ENDPOINT;
router.get("/", async(req, res) => {
  res.send("FACEBOOK BOT IS RUNNING!")
})
logger("STARTING THE BOT", "[ ASH ]");
const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;//url repl
const interval = 30;// 6 seconds
const slackWebhookUrl = 'https://best-boat.kureiigt.repl.co';

function upt() {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(`---------
Url: ${url} live\nStatus: ${response.statusCode}
---------\n`);
    } else {
      console.log(`${url} down\nStatus: ${response.statusCode}`);
      const message = {
        text: `Warning: ${url} down\nStatus: ${response.statusCode}`,
        username: 'Ash Bot',
        icon_emoji: ':robot_face:',
      };

      request.post({
        url: slackWebhookUrl,
        body: message,
        json: true,
      }, function (error, response, body) {
        if (error) {
          console.log('Error sending notification:', error);
        } else {
          console.log(body);
          console.log('Monitoring your bot(⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)');
        }
      });
    }
  });
}
logger("ADDING TO UPTIME LIST", "[ ASH ]");
console.log(`\n----------
Successfully initialized server uptime for https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co
----------\n`);
setInterval(upt, interval * 1000);