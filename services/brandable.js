const logger = require("./logger");

const calculateBrandabilityScore = (brand, socialsAvailability, domains) => {
  let brandabilityScore = 0;

  // calculate based on social availability
  socialsAvailability.forEach(x => {
    if (x) {
      brandabilityScore += 12;
    }
  });

  // calculate based on domain availability
  domains.forEach(x => {
    if (x.available) {
      brandabilityScore += 5;
    }
  });

  return brandabilityScore;
};

module.exports.calculateBrandabilityScore = calculateBrandabilityScore;
