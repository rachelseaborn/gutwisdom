import { Component } from "react";
import Auth from "../Auth/Auth";
import Subscribe from "../Subscribe/Subscribe";
import { withRouter } from "react-router";

import "./Landing.css";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      view: "login",
    };
  }

  render() {
    return (
      <div className="Landing">
        {this.state.view === "login" ? (
          <div>
            <Auth />
            <p>
              Don't have an account?
              <a onClick={() => this.setState({ view: "subscribe" })}>
                Sign up here.
              </a>
            </p>
          </div>
        ) : (
          <div>
            <Subscribe />
            <p>
              Have an account?
              <a onClick={() => this.setState({ view: "login" })}>
                Login here.
              </a>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Landing);
