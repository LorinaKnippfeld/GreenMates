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
            <div className="Profile">
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
