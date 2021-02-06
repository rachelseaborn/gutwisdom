import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
// import { clearUser } from "../../redux/userReducer";
import { Component } from "react";
import { withRouter } from "react-router";

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePicture: "",
      registerView: false,
    };
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // handleSubscribe = () => {
  //     const { username, email, password, confirmPassword, profilePicture } = this.state

  //     if (password && password === confirmPassword) {
  //         axios.post('/api/subscribe', { username, email, password, profilePicture})
  //         .then(res => {
  //             this.props.getUser(res.data)
  //             this.props.history.push('/dashboard')
  //         })
  //     } else {
  //         alert("Passwords don't match.")
  //     }
  // }

  handleRegister = (e) => {
    const {
      username,
      email,
      password,
      confirmPassword,
      profilePicture,
    } = this.state;

    e.preventDefault();

    if (password && password === confirmPassword) {
      axios
        .post("/api/register", { username, email, password, profilePicture })
        .then((res) => {
          this.props.getUser(res.data); //get user obj from server and pass to redux
          // this.props.history.push('/')
        })
        .catch((err) => console.log(err));
    } else {
      alert("Passwords don't match.");
    }
  };

  handleLogin = (e) => {
    const { email, password } = this.state;

    e.preventDefault();

    axios
      .post("/api/login", { email, password })
      .then((res) => {
        // this.props.getUser(res.data);
        console.log(this.props);
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      profilePicture,
    } = this.state;

    return (
      <div className="user-setup">
        <form className="login-form">
          <input
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => this.handleInput(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => this.handleInput(e)}
          />
          <button onClick={(e) => this.handleLogin(e)}>Login</button>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = reduxState => reduxState;

export default connect((state) => state, { getUser })(withRouter(Auth));
