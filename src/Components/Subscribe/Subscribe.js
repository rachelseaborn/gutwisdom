import axios from 'axios';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../redux/userReducer';

import StripeCheckout from 'react-stripe-checkout';
import stripe from 'stripe';

// import {
//     Elements,
//     ElementsConsumer,
//     CardElement,
//     useElements,
//     useStripe
// } from '@stripe/react-stripe-js';

// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe("pk_test_51IGGBiB7KTOVmYmSPC6VeoLDPhdFG7uqrHI64vdKuC6bbUrPXb3cNkD5LbxSV411cUsIv7satV0gWG6ka5QbYUMP00E09ZcKKY");

// class Subscribe extends Component {

//     handleSubmit = async () => {
//         const { elements, stripe } = this.props;
//         const CardElement = elements.getElement(CardElement);

//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card: CardElement
//         });

//         if (error) {
//             console.log('[Error]', error);
//         } else {
//             console.log('[PaymentMethod]', paymentMethod);
//         }
//     }
//     render() {
//         return (
//             <>
//                 <h1>Payment Form</h1>
//                 <CardElement />
//                 <button onClick={this.handleSubmit}>Subscribe</button>
//             </>
//         )
//     }
// }

// export class StripePaymentForm extends Component {
//     render() {
//         return (
//             <Elements stripe={stripePromise}>
//                 <ElementsConsumer>
//                     {(ctx: any) => <Subscribe {...ctx} />}
//                 </ElementsConsumer>
//             </Elements>
//         )
//     }
// }



class Subscribe extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            profilePicture: '',
            subscribed: false
        }
    }

    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleRegister = (e) => {
        const { username, email, password, confirmPassword, profilePicture } = this.state

        e.preventDefault();

        if (password && password === confirmPassword) {
            axios.post('/api/register', { username, email, password, profilePicture })
                .then(res => {
                    this.props.getUser(res.data)
                })
                .catch(err => console.log(err))
        } else {
            alert("Passwords don't match.")
        }
    }

    toggleInfo = () => {
        this.setState({ subscribed: this.state.subscribed })
    }

    onToken = async (token) => {
        token.card = void 0;

        await axios.post('/api/payment', { token, amount: 30000 })
            .then(() => {
                alert('Payment submitted')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="paidSubscription">
                <div className="Subscribe">
                    <input name='username' placeholder='username' value={this.state.username} onChange={e => this.handleInput(e)} />
                    <input name='email' placeholder='Email' value={this.state.email} onChange={e => this.handleInput(e)} />
                    <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={e => this.handleInput(e)} />
                    <input type='password' name='confirmPassword' placeholder='Confirm password' value={this.state.confirmPassword} onChange={e => this.handleInput(e)} />
                    <input name='profilePicture' placeholder='Profile picture link' value={this.state.profilePicture} onChange={e => this.handleInput(e)} />
                    <button onClick={this.handleRegister, this.toggleInfo}>Subscribe</button>
                </div>
                {/* {this.state.subscribed && */}

                <StripeCheckout
                    label='Submit payment'
                    token={this.onToken}
                    stripeKey={stripe.publicKey}
                    stripeKey="pk_test_51IGGBiB7KTOVmYmSPC6VeoLDPhdFG7uqrHI64vdKuC6bbUrPXb3cNkD5LbxSV411cUsIv7satV0gWG6ka5QbYUMP00E09ZcKKY"
                    amount={3000}
                />
                {/* } */}
            </div>
        )
    }
}



const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { getUser })(Subscribe)