import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Card extends React.Component {
  render() {
    return (
      <div
        className={`${
          this.props.positive
            ? "bg-green-200 border-green-700"
            : "bg-red-300 border-red-600"
        } p-5 m-4 border-b-2 rounded-lg shadow-lg flex-1`}
      >
        <div className="flex flex-row items-center">
          <div className="flex-shrink pr-4">
            <FontAwesomeIcon icon={this.props.icon} size="2x" />
          </div>
          <div className="flex-1 text-right md:text-center">
            <h3 className="text-xl font-bold">{this.props.title}</h3>
            <h5
              className={`${
                this.props.positive ? "text-green-700" : "text-red-700"
              }`}
            >
              {this.props.subtitle}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}
