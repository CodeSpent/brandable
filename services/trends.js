const googleTrendsApi = require("google-trends-api");

const calculateAverageOfTimelineData = async timelineData => {
  if (timelineData.length === 0) {
    return 0;
  } else {
    let values = timelineData.map(plot => {
      return plot.value[0];
    });
    return values.reduce((x, y) => x + y, 0) / values.length;
  }
};

const getTrendAverageForWord = async word => {
  return await googleTrendsApi
    .interestOverTime({ keyword: word })
    .then(data => {
      data = JSON.parse(data);
      let timelineData = data.default.timelineData;
      if (timelineData.length === 0) {
        return 0;
      } else {
        let values = timelineData.map(plot => {
          return plot.value[0];
        });
        return values.reduce((x, y) => x + y, 0) / values.length;
      }
    });
};

module.exports.getTrendAverageForWord = getTrendAverageForWord;
