// import React & axios

import React from "react";
import { Link } from "react-router-dom";
import axios from "./myAxios";
import ProfilePic from "./ProfilePic.js";
import FriendButton from "./FriendButton.js";

// set up the class component

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: null,
        };
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const response = await axios.get("/api/users/" + id);
        const { user, isSelf } = response.data;
        if (isSelf) {
            this.props.history.push("/");
        } else if (user) {
            this.setState({ user });
        } else {
            this.setState({ error: "Could not load user" });
        }
    }

    render() {
        const { user } = this.state;
        if (!user) {
            return (
                <div className="Profilenotfound">
                    <h1>profile not found ⛔️</h1>
                </div>
            );
        } else {
            return (
                <div className="otherUser">
                    <div className="otherUserProfile">
                        {user.firstname}'s profile page
                    </div>
                    <ProfilePic url={user.profile_pic_url} />
                    <div className="profileData">
                        {user.firstname}
                        <br></br>
                        {user.lastname}
                    </div>
                    <p className="bioResult">{user.bio}</p>
                    <br />
                    {user.id && <FriendButton otherId={user.id} />}
                    <Link className="linkHomeSearch" to="/">
                        Back
                    </Link>
                </div>
            );
        }
    }
}
