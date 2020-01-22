import React from "react";
import Request from "superagent";

// components
import Header from "./components/header";
import BrandInput from "./components/brandInput";
import Results from "./components/results";

// fontawesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
library.add(fab, faGlobe);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      loading: false,
      brandabilityData: null,
      searching: false
    };
  }

  onFormSubmit(form) {
    this.setState({
      loading: true
    });
    Request.post("/brand")
      .send({ brand: form.brand })
      .set("Accept", "application/json")
      .then((res, err) => {
        console.error(err);
        if (err) {
          this.setState({
            error: true
          });
        } else {
          this.setState({
            loading: false,
            brandabilityData: res.body
          });
        }
      });
  }

  render() {
    return (
      <div className="flex flex-col items-center w-3/4 mx-auto my-12">
        <Header />
        <BrandInput onFormSubmit={this.onFormSubmit.bind(this)}></BrandInput>
        <Results
          loading={this.state.loading}
          results={this.state.brandabilityData}
        ></Results>
      </div>
    );
  }
}
