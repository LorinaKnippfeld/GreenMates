// import React & axios

import React from "react";
import Register from "./Register.js";
import Login from "./Login.js";
import PasswordReset from "./PasswordReset.js";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/passwordreset" component={PasswordReset} />
                </div>
            </HashRouter>
        </div>
    );
}
