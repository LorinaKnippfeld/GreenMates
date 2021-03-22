// import React & axios

import React from "react";
import axios from "./myAxios";

// enable hashrouting

import { Link } from "react-router-dom";

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
                console.log("response from register axios", response.data);

                if (response.data.success) {
                    console.log("Register successful");
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
                <h2 className="registertext">Please register my friend</h2>
                {this.state.error && (
                    <div className="registererror">{this.state.error}</div>
                )}

                <form onSubmit={this.onSubmit}>
                    <label htmlFor="firstname">Firstname</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        autoComplete="off"
                        onChange={(event) => this.handleChange(event)}
                    />

                    <label htmlFor="lastname">Lastname</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        autoComplete="off"
                        onChange={(event) => this.handleChange(event)}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        onChange={(event) => this.handleChange(event)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="off"
                        onChange={(event) => this.handleChange(event)}
                    />

                    <button onClick={() => this.submit()}>Register</button>
                </form>

                <p>
                    {"Already registerd?"}
                    <Link to="/login">Please login here.</Link>
                </p>
            </div>
        );
    }
}
