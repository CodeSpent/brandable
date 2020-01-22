const axios = require("axios");
const logger = require("./logger");

const baseUrl = "https://api.ote-godaddy.com/v1";

const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    Authorization: process.env.GODADDY_AUTH_TOKEN
  }
});

const getDomainAvailabilities = async function(sld) {
  const tlds = ["dev", "com", "tv", "io", "app", "me"];
  let checkedDomains = [];
  return new Promise(resolve => {
    tlds.forEach(tld => {
      let domain = `${sld}.${tld}`;
      checkDomainAvailability(domain).then(data => {
        checkedDomains.push(data);
        if (checkedDomains.length == tlds.length) {
          resolve(checkedDomains);
        }
      });
    });
  });
};

const checkDomainAvailability = function(domain) {
  return api
    .get("/domains/available", {
      params: {
        domain: domain,
        checkType: "FULL",
        forTransfer: false
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      logger.error("Godaddy", err);
    });
};

module.exports.getDomainAvailabilities = getDomainAvailabilities;
module.exports.checkDomainAvailability = checkDomainAvailability;
