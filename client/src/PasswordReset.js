// import React & axios

import React from "react";
import axios from "./myAxios";

// enable hashrouting

import { Link } from "react-router-dom";

// set up the class component

export default class PasswordReset extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1,
            email: "",
            newPassword: "",
            secretcode: "",
            error: false,
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    // prevent default form behaviour

    onSubmit(event) {
        event.preventDefault();
    }

    // make axios requests on clicking the button

    startReset() {
        axios
            .post("/api/resetcode", { email: this.state.email })
            .then((response) => {
                this.setState({ step: 2 });
            })
            .catch((error) => {
                console.log("Something went wrong with reset email", error);
            });
    }

    setNewPassword() {
        axios
            .post("api/updatepw", {
                email: this.state.email,
                secretcode: this.state.secretcode,
                newPassword: this.state.newPassword,
            })
            .then((response) => {
                if (response.data.success === true) {
                    console.log(response.data);
                    this.setState({ step: 3 });
                } else {
                    console.log(response.data.error);
                }
            })
            .catch((error) => {
                console.log(
                    "Something went wrong with creating a new password",
                    error
                );
            });
    }

    // render the form according to steps for pw reset

    render() {
        if (this.state.step === 1) {
            return (
                <div className="requestpwcode">
                    <h2>Please provide your email address</h2>
                    {this.state.error && (
                        <div className="error">{this.state.error}</div>
                    )}

                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="off"
                            onChange={(event) => this.handleChange(event)}
                        />
                        <button onClick={() => this.startReset()}>
                            Reset email
                        </button>
                    </form>
                </div>
            );
        }
        if (this.state.step === 2) {
            return (
                <div className="insertpwcode">
                    <h2>Check your inbox in order to reset your password</h2>
                    {this.state.error && (
                        <div className="error">{this.state.error}</div>
                    )}

                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="secretcode">Secret Code</label>
                        <input
                            type="secretcode"
                            name="secretcode"
                            id="secretcode"
                            autoComplete="off"
                            onChange={(event) => this.handleChange(event)}
                        />
                        <label htmlFor="newPassword">New password</label>
                        <input
                            type="newPassword"
                            name="newPassword"
                            id="newPassword"
                            autoComplete="off"
                            onChange={(event) => this.handleChange(event)}
                        />
                        <button onClick={() => this.setNewPassword()}>
                            Create a new password
                        </button>
                    </form>
                </div>
            );
        }
        if (this.state.step === 3) {
            return (
                <div>
                    <div>Reset worked!</div>
                    <p>
                        {"Click here for the login page"}
                        <Link to="/login">Please login here.</Link>
                    </p>
                </div>
            );
        }
    }
}
