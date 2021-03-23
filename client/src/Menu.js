// import React & axios

import React from "react";
import { Link } from "react-router-dom";

// set up the class component

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="menu">
                <Link to="/search">Search other plantis</Link>
                <Link to="/friends">Clicke here to see your friends</Link>
                <Link to="/chat">Click here for planti feed</Link>
                <Link to="/user">Click here to edit your profile</Link>
            </div>
        );
    }
}
