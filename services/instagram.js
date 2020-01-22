const axios = require("axios");
const logger = require("./logger");

const baseUrl = "https://instagram.com";

const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000
});

const checkUserExists = function(username) {
  return api
    .get(`/${username}`)
    .then(res => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch(err => {
      return false;
    });
};

module.exports.checkUserExists = checkUserExists;
