import React from "react";

export default class BrandInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        brand: ""
      }
    };
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit(this.state.form);
  }

  handleChange(event) {
    this.state.form.brand = event.target.value.trim();
    this.setState({
      form: this.state.form
    });
  }

  render() {
    return (
      <form
        className="flex flex-row w-full m-auto"
        onSubmit={this.onFormSubmit.bind(this)}
      >
        <input
          type="text"
          className="w-full px-4 py-2 border rounded "
          placeholder="Check a brand"
          required
          maxLength="50"
          value={this.state.form.brand}
          onChange={this.handleChange.bind(this)}
        ></input>
        <button
          type="submit"
          className="px-4 ml-2 text-green-800 bg-green-400 rounded-lg"
        >
          Search
        </button>
      </form>
    );
  }
}
