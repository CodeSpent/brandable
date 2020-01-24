const logger = require("./logger");
const wordList = require("../data/words.json");

const trends = require("./trends");

const findPossibleWords = async brand => {
  let word = brand.toLowerCase();
  let foundWords = [];
  for (savedWord in wordList) {
    if (word.includes(savedWord)) {
      foundWords.push(savedWord);
    }
  }
  return foundWords;
};

const getMatchWithLeastunusedChars = async matches => {
  let match = matches.reduce((min, match) =>
    min.unusedChars.length < match.unusedChars.length
      ? min
      : match
  );
  return match;
};

const getProbableMatches = async (possibleWords, compareString) => {
  let newMatches = [];
  compareString = compareString.toLowerCase();
  possibleWords.forEach(x => {
    possibleWords.forEach(y => {
      let combination = x + " " + y;
      let trimmedCombination = combination.replace(/\s+/g, "");
      if (compareString.includes(trimmedCombination)) {
        let combinationObject = {
          phrase: combination,
          words: [x, y],
          brand: trimmedCombination,
          unusedChars: []
        };
        newMatches.push(combinationObject);
        let compareStringArray = [...compareString];
        let unusedCharsString = compareString.replace(
          trimmedCombination,
          ""
        );

        if (
          unusedCharsString.length === 0 &&
          trimmedCombination === compareString
        ) {
          return [combinationObject];
        } else {
          let unusedCharsArray = [];
          unusedCharsArray.push(...unusedCharsString);

          let remainingCharacter = {};
          unusedCharsArray.forEach(x => {
            remainingCharacter.char = x;
            remainingCharacter.indexFromOriginal = compareStringArray.indexOf(
              x
            );
            remainingCharacter.length = unusedCharsArray.length;
            combinationObject.unusedChars.push(remainingCharacter);
          });
        }
      }
    });
  });
  return newMatches;
};

const calculateSocialsScore = async socials => {
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
};

const calculateDomainsScore = domains => {
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
};

const findWordsFromBrand = async brand => {
  let match;
  await findPossibleWords(brand).then(words => {
    getProbableMatches(words, brand).then(matches => {
      match = getMatchWithLeastunusedChars(matches);
    });
  });
  return match;
};

const calculateMemorabilityScore = async match => {
  let score = 0;
  let remainingChars = match.unusedChars.length;
  let wordCount = [...match.phrase].length;

  if (wordCount < 4) {
    score += 20;
  } else if (wordCount >= 4 && wordCount < 6) {
    score += 5;
  } else {
    score = score;
  }

  if (remainingChars > 4) {
    score -= 10;
  } else if (remainingChars < 2) {
    score += 10;
  }
  return score;
};

const getBrandLengthScore = async brand => {
  if (brand.length > 20) {
    return 0;
  } else if (brand.length <= 20 && brand.length > 10) {
    return 5;
  } else if (brand.length <= 10 && brand.length > 6) {
    return 8;
  } else if (brand.length <= 6) {
    return 10;
  } else {
    return 0;
  }
};

const calculateTrendScoreForWords = async words => {
  let score = 0;
  for await (word of words) {
    await trends.getTrendAverageForWord(words).then(average => {
      score += average;
      return average;
    });
  }
  return score;
};

const calculateBrandabilityScore = async (
  brand,
  socialsAvailability,
  domains
) => {
  let brandabilityScore = 0;

  await calculateSocialsScore(socialsAvailability).then(socialScore => {
    brandabilityScore += socialScore;
  });

  await calculateDomainsScore(domains).then(domainScore => {
    brandabilityScore += domainScore;
  });

  const wordsFromBrand = await findWordsFromBrand(brand).then(match => {
    let remainingChars = match.unusedChars.length;
    let wordCount = [...match.phrase].length;
    memorability = ((wordCount - remainingChars) * 10) / match.brand.length;
    return match;
  });

  const brandLengthScore = await getBrandLengthScore(brand).then(score => {
    brandabilityScore += score;
    return score;
  });

  const memorabilityScore = await calculateMemorabilityScore(
    wordsFromBrand
  ).then(score => {
    brandabilityScore += score;
    return score;
  });

  const trendScore = await calculateTrendScoreForWords(
    wordsFromBrand.words
  ).then(average => {
    brandabilityScore += average;
    return average;
  });

  return {
    score: Math.round(brandabilityScore),
    sentiment: {
      wordsFromBrand: wordsFromBrand,
      memorabilityScore: memorabilityScore,
      lengthScore: brandLengthScore,
      trendScore: trendScore
    }
  };
};

module.exports.calculateBrandabilityScore = calculateBrandabilityScore;
