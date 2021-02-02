import react from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../redux/userReducer';

import { Component } from 'react'

class Auth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            profilePicture: '',
            registerView: false
        }
    }

    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

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

    login = (e) => {
        e.preventDefault();
        axios.post('/api/login', { email: this.state.email, password: this.state.password })
            .then(res => {
                this.props.getUser(res.data);
                this.props.history.push('/dashboard');
            })
            .catch(err => console.log(err));

    }

    render() {
        const { email, password } = this.state;

        return (

            <form className='login-form'>
                <input name='email' placeholder='Email' value={email} onChange={e => this.handleInput(e)} />
                <input type='password' name='password' placeholder='Password' value={password} onChange={e => this.handleInput(e)} />
                <button onClick={e => this.login(e)}>Login</button>
            </form>

        )
    }
}

export default connect(null, { getUser })(Auth)