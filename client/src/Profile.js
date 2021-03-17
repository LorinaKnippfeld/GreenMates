// import React & axios

import React from "react";
import ProfilePic from "./ProfilePic.js";
import BioEditor from "./BioEditor";

// set up the class component

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Profile">
                <ProfilePic
                    profile_pic_url={this.props.profile_pic_url}
                    clickHandler={this.props.clickHandler}
                />
                <BioEditor
                    bio={this.props.bio}
                    saveHandler={this.props.bioEditor}
                />
            </div>
        );
    }
}
