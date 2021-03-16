// component setup

import React from "react";

export default class ProfilePic extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { profile_pic_url, clickHandler } = this.props;
        if (!profile_pic_url) {
            return (
                <div
                    className="profilePic"
                    onClick={() => this.props.clickHandler()}
                >
                    <img src="/Profile_Pic.png"></img>
                </div>
            );
        } else {
            return (
                <div
                    className="profilePic"
                    onClick={() => this.props.clickHandler()}
                >
                    <img src={profile_pic_url}></img>
                </div>
            );
        }
    }
}
