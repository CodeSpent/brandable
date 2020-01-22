import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class DomainList extends React.Component {
  render() {
    return (
      <div className="flex flex-row flex-wrap justify-center">
        {this.props.domains.map((domain, index) => (
          <div
            className={`${
              domain.available
                ? "bg-green-200 border-green-700"
                : "bg-red-300 border-red-600"
            } p-5 m-4 border-b-2 rounded-lg shadow-lg flex-1`}
          >
            <div className="flex flex-row items-center">
              <div className="flex-shrink pr-4">
                <FontAwesomeIcon icon="globe" size="2x" />
              </div>
              <div className="flex-1 text-right md:text-center">
                <h3 className="text-xl font-bold">{domain.domain}</h3>
                <h5
                  className={`${
                    domain.available ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {domain.available ? "Available!" : "Taken"}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
