import { Component } from 'react';
import {
    Elements,
    ElementsConsumer,
    CardElement,
    useElements,
    useStripe
} from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51IGGBiB7KTOVmYmSPC6VeoLDPhdFG7uqrHI64vdKuC6bbUrPXb3cNkD5LbxSV411cUsIv7satV0gWG6ka5QbYUMP00E09ZcKKY");

class Subscribe extends Component {

    handleSubmit = async () => {
        const { elements, stripe } = this.props;
        const CardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: CardElement
        });

        if (error) {
            console.log('[Error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    }
    render() {
        return (
            <>
                <h1>Payment Form</h1>
                <CardElement />
                <button onClick={this.handleSubmit}>Subscribe</button>
            </>
        )
    }
}

export class StripePaymentForm extends Component {
    render() {
        return (
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {(ctx: any) => <Subscribe {...ctx} />}
                </ElementsConsumer>
            </Elements>
        )
    }
}


export default Subscribe