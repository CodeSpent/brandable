const axios = require("axios");
const logger = require("./logger");

const baseUrl = "https://www.googleapis.com/youtube/v3";

const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

const getUser = function(username) {
  return api
    .get("channels", {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        part: "contentDetails",
        forUsername: username
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      logger.error("Youtube:", err);
    });
};

module.exports.getUser = getUser;
