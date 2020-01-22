import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class PlatformCard extends React.Component {
  render() {
    return (
      <div
        className={`${
          this.props.available
            ? "bg-green-200 border-green-700"
            : "bg-red-300 border-red-600"
        } p-5 m-4 border-b-2 rounded-lg shadow-lg flex-1`}
      >
        <div className="flex flex-row items-center">
          <div className="flex-shrink pr-4">
            <FontAwesomeIcon icon={["fab", this.props.platform]} size="2x" />
          </div>
          <div className="flex-1 text-right md:text-center">
            <h3 className="text-xl font-bold">{this.props.brand}</h3>
            <h5
              className={`${
                this.props.available ? "text-green-700" : "text-red-700"
              }`}
            >
              {this.props.available ? "Available!" : "Taken"}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}
