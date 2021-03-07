import React from "react";

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

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
    };

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
