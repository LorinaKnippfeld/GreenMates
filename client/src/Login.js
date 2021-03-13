// import React & axios

import React from "react";
import axios from "./myAxios";

// enable hashrouting

import { Link } from "react-router-dom";

// set up the class component

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: false,
        };
    }

    // make axios request on clicking the button

    submit() {
        axios
            .post("/api/login", this.state)
            .then((response) => {
                const { success } = response.data;
                if (success) {
                    console.log("Login successful");
                    location.replace("/");
                } else {
                    console.log("Login failed");
                }
            })
            .catch((error) => {
                console.log("Something went wrong with the login", error);
            });
    }

    // react on changes for states

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    // render the form

    render() {
        return (
            <div className="Login">
                <h2>Please login</h2>
                {this.state.error && (
                    <div className="error">{this.state.error}</div>
                )}

                <form>
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

                    <button onClick={() => this.submit()}>Login</button>
                </form>

                <p>
                    {"Not registered yet?"}
                    <Link to="/register">Register here.</Link>
                </p>
            </div>
        );
    }
}
