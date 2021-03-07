import React from "react";
import Register from "./register.js";

export default class Welcome extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="register">
                <Register />
            </div>
        );
    }
}
