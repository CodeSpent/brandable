import React from "react";
import Loading from "./loading";

import Card from "./card";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  getEmotionIcon(emotion) {
    switch (emotion.value) {
      case "neutral":
        return "meh";
      case "happy":
        return "smile-beam";
      case "angry":
        return "angry";
      case "sad":
        return "sad-tear";
      default:
        return "surprise";
    }
  }

  getMetricIcon(metric) {
    switch (metric.name) {
      case "length":
        return "ruler";
      case "memorability":
        return "brain";
      case "trending":
        return "chart-line";
      case "uniqueness":
        return "snowflake";
      case "emotion":
        let emoji = this.getEmotionIcon(metric);
        return emoji;
      default:
        return "chart-line";
    }
  }

  getLengthValueString(value) {
    if (value <= 10) {
      return "Short";
    } else if (value > 10 && value <= 20) {
      return "Longer";
    } else {
      return "Too long";
    }
  }

  getMemorabilityValueString(value) {
    if (value >= 10) {
      return "Memorable";
    } else if (value > 10 && value <= 20) {
      return "Memorable";
    } else {
      return "Forgetable";
    }
  }

  getTrendingValueString(value) {
    if (value >= 10) {
      return "Trending";
    } else if (value > 10 && value <= 20) {
      return "Good trends";
    } else {
      return "Not trending";
    }
  }

  getUniquenessValueString(value) {
    if (value >= 10) {
      return "Unique";
    } else if (value > 10 && value <= 20) {
      return "Okay";
    } else {
      return "Too common";
    }
  }

  getMetricValueEnum(metric) {
    switch (metric.name) {
      case "length":
        return this.getLengthValueString(metric.value);
      case "memorability":
        return this.getMemorabilityValueString(metric.value);
      case "trending":
        return this.getTrendingValueString(metric.value);
      case "uniqueness":
        return this.getUniquenessValueString(metric.value);
      case "emotion":
        return metric.value.charAt(0).toUpperCase() + metric.value.slice(1);
      default:
        return "No rating";
    }
  }

  getMetricRatingColor(value) {
    if (typeof value === "string") {
      switch (value) {
        case "neutral":
          return "orange";
        case "happy":
          return "green";
        case "angry":
          return "red";
        case "sad":
          return "red";
        default:
          return "blue";
      }
    } else {
      if (value >= 8) {
        return "green";
      } else if (value > 8 && value <= 20) {
        return "orange";
      } else {
        return "red";
      }
    }
  }

  getMetricRatingString(value) {
    if (typeof value === "string") {
      switch (value) {
        case "neutral":
          return "fair";
        case "happy":
          return "great";
        case "angry":
          return "poor";
        case "sad":
          return "poor";
        default:
          return "unknown";
      }
    } else {
      if (value >= 8) {
        return "great";
      } else if (value > 8 && value <= 20) {
        return "fair";
      } else {
        return "poor";
      }
    }
  }

  getBrandabilityScoreColor(score) {
    if (score > 100) {
      return "green";
    } else if (score <= 100 && score >= 50) {
      return "orange";
    } else {
      return "red";
    }
  }

  render() {
    if (this.props.loading) {
      return <Loading loadingText="Checking brandability score.."></Loading>;
    }

    if (this.props.results) {
      return (
        <div className="mx-auto mt-10">
          <div className="text-center">
            <h1 className="text-3xl font-semibold uppercase">
              {this.props.results.brand}
            </h1>
            <h1 className="text-2xl font-bold">
              Brandability Score:{" "}
              <span
                className={`font-black text-${this.getBrandabilityScoreColor(
                  this.props.results.score
                )}-600`}
              >
                {this.props.results.score}
              </span>
            </h1>

            <div className="flex flex-col m-5 mt-10">
              <div className="text-2xl font-black text-left uppercase ">
                <h1>Social Networks</h1>
                <h4 className="text-xs text-gray-500">
                  Disclaimer: Usernames are not guranteed to be available for
                  public use.
                </h4>
              </div>
              <div className="flex flex-row flex-wrap justify-center">
                {this.props.results.socials.map((social, index) => (
                  <Card
                    key={social.name}
                    title={this.props.results.brand}
                    icon={["fab", social.name]}
                    color={social.available ? "green" : "red"}
                    subtitle={social.available ? "Available!" : "Taken"}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col m-5 mt-10">
              <div className="text-2xl font-black text-left uppercase ">
                <h1>Domains</h1>
                <h4 className="text-xs text-gray-500">
                  Domain availability courtesy of Domainr.
                </h4>
              </div>
              <div className="flex flex-row flex-wrap justify-center">
                {this.props.results.domains.map((domain, index) => (
                  <Card
                    key={domain.domain}
                    title={domain.domain}
                    icon={"globe"}
                    color={domain.available ? "green" : "red"}
                    subtitle={domain.available ? "Available!" : "Taken"}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col m-5 mt-10">
              <div className="text-2xl font-black text-left uppercase ">
                <h1>Sentiment</h1>
                <h4 className="text-xs text-gray-500">
                  Currently sentiment analysis only works in English.
                </h4>
              </div>
              <div className="flex flex-row flex-wrap justify-center">
                {this.props.results.metrics.map((metric, index) => (
                  <Card
                    key={metric.name}
                    title={this.getMetricValueEnum(metric)}
                    icon={this.getMetricIcon(metric)}
                    color={this.getMetricRatingColor(metric.value)}
                    subtitle={this.getMetricRatingString(metric.value)}
                    brand={this.props.results.brand}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mx-auto my-5 text-center text-gray-600">
          <h1>Enter your product name above to see your brandability score.</h1>
        </div>
      );
    }
  }
}
