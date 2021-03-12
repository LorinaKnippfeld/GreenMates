// import React & axios

import React from "react";
import axios from "axios";

// set up the class component

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            error: false,
        };
    }

    // react on changes for states

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    // prevent default form behaviour

    onSubmit(event) {
        event.preventDefault();
    }

    // make axios request on clicking the button

    submit() {
        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
        };
        axios
            .post("/api/register", user)
            .then((response) => {
                console.log("reponse fom register axios", response.data);

                if (response.data.success) {
                    location.replace("/");
                } else {
                    this.setState({ error: response.data.error });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // render the form

    render() {
        return (
            <div className="Register">
                <h2>Please register my friend</h2>
                {this.state.error && (
                    <div className="error">{this.state.error}</div>
                )}

                <form onSubmit={this.onSubmit}>
                    <label htmlFor="firstname">Firstname</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        onChange={(event) => this.handleChange(event)}
                    />

                    <label htmlFor="lastname">Lastname</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        onChange={(event) => this.handleChange(event)}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(event) => this.handleChange(event)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(event) => this.handleChange(event)}
                    />

                    <button onClick={() => this.submit()}>Register</button>
                </form>

                <div>Click here to login</div>
            </div>
        );
    }
}
