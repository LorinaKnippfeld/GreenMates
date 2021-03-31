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
                    <br></br>
                    <br></br>
                    <Link id="seeFriendsLink" to="/friends">
                        Friends
                    </Link>
                    <br></br> <br></br>
                    <Link id="plantiFeedLink" to="/chat">
                        Feed
                    </Link>
                    <br></br> <br></br>{" "}
                    <Link id="editProfileLink" to="/user">
                        Profile
                    </Link>
                    <Link id="findPlantsLink" to="/findplants">
                        Plant Search
                    </Link>
                </div>
                <div className="logo"></div>
            </div>
        );
    }
}
