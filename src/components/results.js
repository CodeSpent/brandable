import React from "react";
import Loading from "./loading";

import PlatformCard from "./platformCard";
import DomainList from "./domainList";

export default class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) {
      return <Loading loadingText="Checking brandability score.."></Loading>;
    }

    if (this.props.results) {
      return (
        <div className="mx-auto mt-10 ">
          <div className="text-center">
            <h1 className="text-3xl font-bold">{this.props.results.brand}</h1>
            <h1 className="text-3xl font-bold">
              Brandability Score:{" "}
              <span className="font-black text-green-600">
                {this.props.results.score}
              </span>
            </h1>

            <div className="flex flex-col mt-10">
              <div className="text-2xl font-black text-left uppercase">
                <h1>Social Networks</h1>
                <h4 className="text-xs text-gray-500">
                  Disclaimer: Usernames are not guranteed to be available for
                  public use.
                </h4>
              </div>
              <div className="flex flex-row flex-wrap justify-center">
                <PlatformCard
                  platform="instagram"
                  available={this.props.results.instagramAvailable}
                  brand={this.props.results.brand}
                />
                <PlatformCard
                  platform="twitter"
                  available={this.props.results.twitterAvailable}
                  brand={this.props.results.brand}
                />
                <PlatformCard
                  platform="facebook"
                  available={this.props.results.facebookAvailable}
                  brand={this.props.results.brand}
                />
                <PlatformCard
                  platform="twitch"
                  available={this.props.results.twitchAvailable}
                  brand={this.props.results.brand}
                />
                <PlatformCard
                  platform="youtube"
                  available={this.props.results.youtubeAvailable}
                  brand={this.props.results.brand}
                />
                <PlatformCard
                  platform="github"
                  available={this.props.results.githubAvailable}
                  brand={this.props.results.brand}
                />
              </div>
            </div>
            <div className="text-2xl font-black text-left uppercase">
              <h1>Domains</h1>
            </div>
            <div className="flex flex-row flex-wrap justify-center">
              <DomainList domains={this.props.results.domains} />
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
