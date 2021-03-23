// import React & axios

import React from "react";
import { Link } from "react-router-dom";

// set up the class component

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar">
                <Link to="/login" className="loginpath">
                    Login
                </Link>
                <Link to="/register" className="registerpath">
                    Register
                </Link>
            </div>
        );
    }
}
