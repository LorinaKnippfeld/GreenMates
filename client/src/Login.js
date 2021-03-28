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
        const { email, password } = this.state;
        axios
            .post("/api/login", { email, password })
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
            <div className="loginform">
                <h2 className="logintext">Please login</h2>
                <br></br>
                {this.state.error && (
                    <div className="error">{this.state.error}</div>
                )}

                <div>
                    <label className="emaillabel" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        onChange={(event) => this.handleChange(event)}
                    />
                    <br></br>
                    <label className="pwlabel" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="off"
                        onChange={(event) => this.handleChange(event)}
                    />

                    <button
                        className="loginbutton"
                        onClick={() => this.submit()}
                    >
                        Login
                    </button>
                </div>
                <br></br>
                <p className="notregistered">Not registered yet?</p>
                <Link id="registerhere" to="/register">
                    Register here
                </Link>
                <br></br>
                <br></br>
                <p className="forgottenpw"> Forgotten your password? </p>

                <Link className="resethere" to="/passwordreset">
                    Reset your password here
                </Link>
            </div>
        );
    }
}
