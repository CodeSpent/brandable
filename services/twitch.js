const axios = require("axios");
const logger = require("./logger");

const baseUrl = "https://api.twitch.tv/helix";

const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Client-id": process.env.TWITCH_CLIENT_ID,
    "Content-Type": "application/json"
  }
});

const getUser = function(username) {
  return api
    .get("/users", {
      params: {
        login: username
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      logger.error("Twitch:", err);
    });
};

module.exports.getUser = getUser;
