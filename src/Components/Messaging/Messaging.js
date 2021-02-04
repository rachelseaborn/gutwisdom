import { Component } from 'react'
import io from 'socket.io'

class Messaging extends Component {
    constructor() {
        super();
        this.state = {
            input: "",
            message: "",
            room: null,
            joined: false
        };

        this.updateMessage = this.updateMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.joinRoom = this.joinRoom.bind(this);
        this.joinSuccess = this.joinSuccess.bind(this);
    }

    //Don't want componentDidMount on landing page because chat is on demand in another view after user logs in
    componentDidMount() {
        this.socket = io()
        this.socket.on("Message dispatched", data => {
            this.updateMessage(data);
        });

        this.socket.on("Room joined", data => {
            this.joinSuccess()
        });
    }

    componentWillUnmount() {
        this.socket.disconnect()
    }

    updateMessage(message) {
        console.log(message)
        this.setState({
            message
        });
    }

    sendMessage() {
        this.socket.emit('message sent', {
            message: this.state.input,
            room: this.state.room
        })
    }

    joinRoom() {
        if (this.state.room) {
            this.socket.emit("join room", {
                room: this.state.room
            })
        }
    }

    joinSuccess() {
        this.setState({
            joined: true
        });
    }


    render() {
        return (
            <div className="Chat">
                {this.state.joined ? <h1>My room: {this.state.room}</h1> : null}
                <h2>{this.state.message}</h2>
                {
                    this.state.joined
                        ?
                        <div>
                            <input value={this.state.input} onChange={e => {
                                this.setState({
                                    input: e.target.value
                                })
                            }} />
                            <button onClick={this.sendMessage}>Send</button>
                        </div>
                        :
                        <div>
                            <input value={this.state.room} onChange={e => {
                                this.setState({
                                    room: e.target.value
                                })
                            }} />
                            <button onClick={this.joinRoom}>Join</button>
                        </div>
                }
            </div>
        )
    }
}

export default Messaging