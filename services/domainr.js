const axios = require("axios");
const logger = require("./logger");

const baseUrl = "https://domainr.p.rapidapi.com/v2";
const rapidApiKey = process.env.RAPIDAPI_KEY;

const api = axios.create({
  baseURL: baseUrl,
  timeout: 5000
});

function checkDomainStatus(domain) {
  return api
    .get("/status", {
      params: {
        domain: domain,
        "mashape-key": rapidApiKey
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      logger.error("Domainr", err);
    });
}

const getDomainAvailabilities = async function(sld) {
  const tlds = ["dev", "com", "tv", "io", "app", "me"];
  let checkedDomains = [];

  return new Promise(resolve => {
    tlds.forEach(tld => {
      let domain = `${sld}.${tld}`;
      checkDomainStatus(domain).then(res => {
        let statuses = res.status[0].status.split(" ");
        let available = !statuses.includes("active");
        checkedDomains.push({
          domain: domain,
          available: available
        });

        if (checkedDomains.length == tlds.length) {
          resolve(checkedDomains);
        }
      });
    });
  });
};

module.exports.getDomainAvailabilities = getDomainAvailabilities;
