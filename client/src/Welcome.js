// import React & axios

import React from "react";
import Register from "./Register.js";
import Login from "./Login.js";
import PasswordReset from "./PasswordReset.js";
import { HashRouter, Route } from "react-router-dom";
import Navbar from "./Navbar.js";
import Welcometext from "./Welcometext.js";

export default function Welcome() {
    return (
        <div className="welcome">
            <h1 className="welcometext">Welcome!</h1>
            <HashRouter>
                <div>
                    <Navbar />
                    <Route exact path="/" component={Welcometext} />
                    <Route exact path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/passwordreset" component={PasswordReset} />
                </div>
            </HashRouter>
        </div>
    );
}
