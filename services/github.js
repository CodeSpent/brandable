const axios = require("axios");
const logger = require("./logger");

const baseUrl = "https://api.github.com";

const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    Accept: "application/vnd.github.v3+json"
  }
});

const getUser = function(username) {
  return api
    .get("/search/users", {
      params: {
        q: username
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      logger.error("Github:", err);
    });
};

module.exports.getUser = getUser;
