// setup classic component

import React from "react";
import axios from "./myAxios";
import Uploader from "./Uploader.js";
import ProfilePic from "./ProfilePic.js";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            uploaderVisible: false,
        };
    }

    // setup to setState to current user

    componentDidMount() {
        axios.get("/api/user").then((response) => {
            this.setState({
                user: response.data.user,
            });
        });
    }

    // render if uploader visible or not

    render() {
        const { user, uploaderVisible } = this.state;

        if (!user) {
            return <h1>Loading</h1>;
        }
        return (
            <div>
                <ProfilePic
                    url={user.profile_picture_url}
                    clickHandler={() =>
                        this.setState({ uploaderVisible: true })
                    }
                />
                {uploaderVisible && (
                    <Uploader
                        url={user.profile_picture_url}
                        userHandler={(user) =>
                            this.setState({ user, uploaderVisible: false })
                        }
                        closeHandler={() => {
                            this.setState({ uploaderVisible: false });
                        }}
                    />
                )}
            </div>
        );
    }
}
