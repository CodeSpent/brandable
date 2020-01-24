import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Card extends React.Component {
  render() {
    return (
      <div
        className={`bg-${this.props.color}-300 border-${this.props.color}-600 p-5 m-4 border-b-2 rounded-lg shadow-lg flex-1`}
      >
        <div className="flex flex-row items-center">
          <div className="flex-shrink pr-4">
            <FontAwesomeIcon icon={this.props.icon} size="2x" />
          </div>
          <div className="flex-1 text-right md:text-center">
            <h3 className="text-xl font-bold">{this.props.title}</h3>
            <h5
              className={`font-bold text-${this.props.color}-800 uppercase text-sm`}
            >
              {this.props.subtitle}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}
