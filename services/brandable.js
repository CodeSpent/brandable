const logger = require("./logger");

async function calculateSocialsScore(socials) {
  let socialScore = 0;
  return new Promise(resolve => {
    socials.forEach((social, i) => {
      if (social) {
        socialScore += 10;
      }

      if (i + 1 == socials.length) {
        resolve(socialScore);
      }
    });
  });
}

async function calculateDomainsScore(domains) {
  let domainsScore = 0;
  return new Promise(resolve => {
    domains.forEach((domain, i) => {
      if (domain.available) {
        domainsScore += 20;
      }

      if (i + 1 == domains.length) {
        resolve(domainsScore);
      }
    });
  });
}

const calculateBrandabilityScore = async (
  brand,
  socialsAvailability,
  domains
) => {
  let brandabilityScore = 0;

  // calculate based on social availability
  await calculateSocialsScore(socialsAvailability).then(socialScore => {
    brandabilityScore += socialScore;
  });

  // calculate based on domain availability
  await calculateDomainsScore(domains).then(domainScore => {
    brandabilityScore += domainScore;
  });

  return brandabilityScore;
};

module.exports.calculateBrandabilityScore = calculateBrandabilityScore;
