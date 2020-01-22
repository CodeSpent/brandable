const axios = require("axios");
const logger = require("./logger");

const baseUrl = "https://api.twitter.com/1.1";
const consumerKey = "kerSsjF9mafG6NL2KroKt973C";
const consumerSecret = "ByLkH59Qjme4EOsOZomhMLF9SNWXcKblRzKQ0Wig84x4cxUTpi";
const bearerToken = process.env.TWITTER_BEARER_TOKEN;

const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${bearerToken}`,
    "Content-Type": "application/json"
  }
});

const checkUserExists = function(username) {
  return api
    .get("/users/lookup.json", {
      params: {
        screen_name: username
      }
    })
    .then(res => {
      if (res.data[0].id) {
        return true;
      }
    })
    .catch(err => {
      return false;
    });
};

module.exports.checkUserExists = checkUserExists;
