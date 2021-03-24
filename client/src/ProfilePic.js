// component setup

import React from "react";

export default class ProfilePic extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { url, clickHandler } = this.props;
        if (!url) {
            return (
                <div onClick={clickHandler}>
                    <img className="profilePic" src="/Profile_Pic.png"></img>
                </div>
            );
        } else {
            return (
                <div onClick={clickHandler}>
                    <img className="profilePic" src={url}></img>
                </div>
            );
        }
    }
}
