import React from "react";
import Register from "./register.js";

export default class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
        };
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    render() {
        const { name } = this.state;
        return (
            <div>
                <h2>Welcome {name} !</h2>
                <input onChange={(event) => this.handleChange(event)}></input>
            </div>
        );
    }
}
