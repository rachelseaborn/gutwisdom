import axios from "axios";
import { Component } from "react";

import Select from "react-select";

const topics = [
  { value: "celiac", label: "Celiac disease" },
  { value: "fitness", label: "Fitness at home" },
];

class TopicDashboard extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      topics: [],
    };
  }

  //Display topic list

  showTopics = () => {
    axios
      .get("/api/search/${this.props.topic_id}")
      .then((res) => {
        this.setState({ topics: res.data });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.showTopics();
  }

  render() {
    return (
      <div className="Dashboard">
        <Select options={topics} />
        {/* <div className='topics'>
          <h2></h2>

        </div> */}
      </div>
    );
  }
}

export default TopicDashboard;
