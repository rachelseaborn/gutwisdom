import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import { clearUser } from "../../redux/userReducer";
import { withRouter } from "react-router";

import Select from "react-select";

class TopicDashboard extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      topics: [],
      topic: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(topic) {
    console.log("User chose a topic.");
    this.setState({ topic });
    axios.get("/api/search/:topic_name");
  }

  // showTopicContent = () => {
  //   this.setState({ label: this.state.topic.topic_name });
  //   axios.get("/api/search/:id");
  // };

  //Display topic list

  getTopics = () => {
    axios
      .get(`/api/search/`)
      .then((res) => {
        this.setState({ topics: res.data });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getTopics();
  }
  // const topics = [
  //   { value: "celiac", label: "Celiac disease" },
  //   { value: "fitness", label: "Fitness at home" },
  //   { value: "plant-based diet", label: "Plant-based diet" },
  // ];

  handleLogout = () => {
    axios
      .get("/api/logout")
      .then(() => {
        this.props.clearUser();
        this.props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  render() {
    const mapTopics = this.state.topics.map((topic) => {
      return { value: topic.value, label: topic.topic_name };
    });
    console.log("this.state.topic", this.state.topic);
    return (
      <div className="Dashboard">
        <Select
          options={mapTopics}
          // isMulti
          onChange={this.handleChange}
        />
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

//     <div className='topics'>
//       <h2></h2>

//   <Select value={this.state.topic} onChange={this.handleChange}>
//   {topics.map((choice) => (
//    <choice value={this.state.topic.value}>
// {this.state.topic.label}
//    </choice>
//    ))}
// </Select>

// export default TopicDashboard

export default connect(null, { getUser, clearUser })(TopicDashboard);
