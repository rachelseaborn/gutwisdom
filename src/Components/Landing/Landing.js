import { Component } from 'react';
import Auth from '../Auth/Auth';
import Subscribe from '../Subscribe/Subscribe';


class Landing extends Component {





    render() {
        return (
            <div className="Landing">
                <Auth />
                <Subscribe />
            </div>
        )
    }
}

export default Landing