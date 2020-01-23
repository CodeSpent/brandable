import React from "react";
import Loading from "./loading";

import Card from "./card";

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
                {this.props.results.socials.map((social, index) => (
                  <Card
                    key={social.name}
                    title={this.props.results.brand}
                    icon={["fab", social.name]}
                    positive={social.available}
                    subtitle={social.available ? "Available!" : "Taken"}
                    brand={this.props.results.brand}
                  />
                ))}
              </div>
            </div>
            <div className="text-2xl font-black text-left uppercase">
              <h1>Domains</h1>
            </div>
            <div className="flex flex-row flex-wrap justify-center">
              {this.props.results.domains.map((domain, index) => (
                <Card
                  key={domain.domain}
                  title={domain.domain}
                  icon="globe"
                  positive={domain.available}
                  subtitle={domain.available ? "Available!" : "Taken"}
                  brand={this.props.results.brand}
                />
              ))}
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
