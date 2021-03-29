// import React & axios

import React from "react";
import ProfilePic from "./ProfilePic.js";
import BioEditor from "./BioEditor";
import { Link } from "react-router-dom";

// set up the class component

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="profile">
                <h2>Profile</h2>
                <h5>Click on the image to change your profile picture</h5>
                <h4>Click below to change your bio</h4>
                <ProfilePic
                    url={this.props.url}
                    clickHandler={this.props.clickHandler}
                />
                <BioEditor
                    bio={this.props.bio}
                    saveHandler={this.props.bioEditor}
                />
                <Link className="linkHomeSearch" to="/">
                    Back
                </Link>
            </div>
        );
    }
}
