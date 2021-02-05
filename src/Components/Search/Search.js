import { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      topics: "",
    };

    //Display available topics from db
  }
  render() {
    return <section>Search</section>;
  }
}

export default Search;
