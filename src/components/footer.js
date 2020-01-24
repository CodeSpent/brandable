import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="flex flex-col w-full p-4 text-center border-t-2 border-gray-300">
        <h1 className="text-gray-600">
          Built with <FontAwesomeIcon icon={["fab", "react"]} spin /> by{" "}
          <a
            className="font-bold"
            href="https://codespent.dev/"
            target="_blank"
          >
            CodeSpent
          </a>
        </h1>
        <h5 className="text-gray-500">
          If you find a problem or have a suggestion, Brandable is{" "}
          <a
            className="font-semibold"
            href="https://github.com/codespent/brandable/"
            target="_blank"
          >
            <FontAwesomeIcon icon={["fab", "github"]} /> open source
          </a>
          !
        </h5>
      </footer>
    );
  }
}
