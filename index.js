require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const logger = require("./services/logger");

const PORT = process.env.PORT || 8080;
const app = express();

const twitch = require("./services/twitch");
const twitter = require("./services/twitter");
const instagram = require("./services/instagram");
const facebook = require("./services/facebook");
const youtube = require("./services/youtube");
const github = require("./services/github");
const brandable = require("./services/brandable");
const domainr = require("./services/domainr");

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.post("/brand", async (req, res) => {
  var brand = req.body.brand;
  logger.info(`Attempting brandability lookup for ${brand}.`);

  let brandabilityScore;
  let twitchAvailable;
  let githubAvailable;
  let facebookAvailable;
  let youtubeAvailable;
  let instagramAvailable;
  let twitterAvailable;
  let domains;

  // check twitch availability
  await twitch.getUser(brand).then(res => {
    const twitchUser = res.data;
    if (twitchUser.length > 0) {
      logger.info(`Twitch username ${brand} is unavailable.`);
      twitchAvailable = false;
    } else {
      logger.info(`Twitch username ${brand} is available.`);
      twitchAvailable = true;
    }
  });

  // check twitter availability
  await twitter.checkUserExists(brand).then(userExists => {
    twitterAvailable = !userExists;
  });
  // check instagram availability
  await instagram.checkUserExists(brand).then(userExists => {
    logger.info(
      `Instagram username ${brand} is ${
        userExists ? "unavailable" : "available"
      }`
    );
    instagramAvailable = !userExists;
  });

  // check facebook availability
  await facebook.checkUserExists(brand).then(userExists => {
    logger.info(
      `Facebook username ${brand} is ${
        userExists ? "unavailable" : "available"
      }`
    );
    facebookAvailable = !userExists;
  });

  // check youtube availability
  await youtube.getUser(brand).then(res => {
    if (res.pageInfo.totalResults >= 1) {
      logger.info(`YouTube channel URL for ${brand} is unavailable.`);
      youtubeAvailable = false;
    } else {
      logger.info(`YouTube channel URL for ${brand} is available.`);
      youtubeAvailable = true;
    }
  });

  // check github availability
  await github.getUser(brand).then(res => {
    if (res.total_count >= 1) {
      logger.info(`Github username ${brand} is unavailable.`);
      githubAvailable = false;
    } else {
      logger.info(`Github username ${brand} is available.`);
      githubAvailable = true;
    }
  });

  // check domain availability
  await domainr.getDomainAvailabilities(brand).then(data => {
    domains = data;
  });

  // calculate score
  brandabilityObject = await brandable.calculateBrandabilityScore(
    brand,
    [
      twitchAvailable,
      youtubeAvailable,
      instagramAvailable,
      githubAvailable,
      facebookAvailable
    ],
    domains
  );

  let results = {
    brand: brand,
    score: brandabilityObject.score,
    sentiment: brandabilityObject.sentiment,
    socials: [
      { name: "twitter", available: twitterAvailable },
      { name: "instagram", available: instagramAvailable },
      { name: "facebook", available: facebookAvailable },
      { name: "twitch", available: twitchAvailable },
      { name: "youtube", available: youtubeAvailable },
      { name: "github", available: githubAvailable }
    ],
    metrics: [
      {
        name: "memorability",
        value: brandabilityObject.sentiment.memorabilityScore
      },
      { name: "length", value: brandabilityObject.sentiment.lengthScore },
      { name: "trending", value: brandabilityObject.sentiment.trendScore }
    ],
    domains: domains
  };
  res.send(results);
});

app.listen(PORT, () => console.log(`Brandable app listening on port ${PORT}!`));
