import React, { Component } from "react";
import RouterContext from "./context";

class HashRouter extends Component {
  constructor() {
    super();
    this.message = null;
    this.state = {
      location: this.getLocationInfo(),
      history: {
        push: this.push.bind(this),
        block: m => (this.message = m)
      }
    };
  }
  push({ path, state = null }) {
    if (this.message !== null) {
      const confirm = window.confirm(
        typeof this.message === "function"
          ? this.message(this.state)
          : this.message
      );
      if (!confirm) return;
    }
    this.message = null;
    window.location.hash = "#" + path;
    window.location.state = state;
  }
  getLocationInfo() {
    if (!window.location.hash) {
      window.location.hash = "#/";
    }
    const pathname = window.location.hash.slice(1);
    return { pathname };
  }
  hashChange() {
    this.setState(state => ({
      location: { ...state.location, ...this.getLocationInfo() }
    }));
  }
  componentDidMount() {
    window.addEventListener("hashchange", this.hashChange.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener(this.hashChange);
  }

  render() {
    return (
      <RouterContext.Provider value={this.state}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

export default HashRouter;
