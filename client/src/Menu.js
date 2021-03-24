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
            <div className="homeText">
                Home
                <div className="menu">
                    <Link id="searchLink" to="/search">
                        Search
                    </Link>
                    <br></br>
                    <br></br>
                    <Link id="seeFriendsLink" to="/friends">
                        friends
                    </Link>
                    <br></br> <br></br>
                    <Link id="plantiFeedLink" to="/chat">
                        feed
                    </Link>
                    <br></br> <br></br>{" "}
                    <Link id="editProfileLink" to="/user">
                        profile
                    </Link>
                </div>
            </div>
        );
    }
}
