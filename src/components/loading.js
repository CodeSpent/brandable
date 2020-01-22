import React from 'react';
import Loader from 'react-loader-spinner';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="flex flex-col items-center w-full p-4">
        <Loader type="Rings" color="#68D391" height={100} width={100} />
        <h1 className="font-light text-center text-gray-600">{this.props.loadingText}</h1>
      </div>
    );
  }
}
