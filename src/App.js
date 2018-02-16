import React, { Component } from "react";
import { random } from "./Store";
import { builder } from "./Search";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      content: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.randomClick = this.randomClick.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const storeKeys = [];
    const build = await builder(this.state.text);
    const pages = build.query.pages;
    Object.keys(pages).map(e => {
      storeKeys.push(pages[e]);
    });
    let dark = storeKeys.map((e, i) => {
      return (
        <div className="item">
          <a
            href={`https://en.wikipedia.org/?curid=${e.pageid}`}
            target="_blank"
          >
            <p className="bold" key={i}>
              {e.title}
            </p>
            <p key={i}>{e.extract}</p>
          </a>
        </div>
      );
    });
    this.setState({
      content: dark,
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
    let content = this.state.content;
    return (
      <div className="container">
        <div className="navBar">
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
        </div>
        <div className="page-container">
          <div className="content-container">{content}</div>
        </div>
      </div>
    );
  }
}

export default App;
