import React, { Component } from "react";
import { random } from "./Store";
import { builder } from "./Search";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", dark: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.randomClick = this.randomClick.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const build = await builder(this.state.text);
    const pages = build.query.pages;
    Object.keys(pages).map(e => {
      console.log(pages[e].extract.split("  "));
    });
    this.setState({
      text: ""
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      text: e.target.value
    });
  }

  randomClick() {
    return window.open(random);
  }

  render() {
    let text = this.state.text;
    return (
      <div className="container">
        <div>
          <button onClick={this.randomClick}>Random Page</button>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              className="text"
              value={text}
              onChange={this.handleChange}
            />
          </form>
        </div>
        <div className="page-container">
          <div>
            <a href="#">{this.state.dark}</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
