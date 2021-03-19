// setup classic component

import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import axios from "./myAxios";
import Uploader from "./Uploader.js";
import ProfilePic from "./ProfilePic.js";
import Profile from "./Profile.js";
import OtherProfile from "./OtherProfile.js";
import FindPeople from "./FindPeople.js";
import Menu from "./Menu.js";

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
                    url={user.profile_pic_url}
                    clickHandler={() =>
                        this.setState({ uploaderVisible: true })
                    }
                />
                {uploaderVisible && (
                    <Uploader
                        url={user.profile_pic_url}
                        userHandler={(user) =>
                            this.setState({ user, uploaderVisible: false })
                        }
                        closeHandler={() => {
                            this.setState({ uploaderVisible: false });
                        }}
                    />
                )}

                <BrowserRouter>
                    <Route
                        path="/user/"
                        render={() => {
                            return (
                                <Profile
                                    url={user.profile_pic_url}
                                    clickHandler={() =>
                                        this.setState({ uploaderVisible: true })
                                    }
                                    bio={user.bio}
                                    bioEditor={(newBio) => {
                                        this.setState({
                                            user: {
                                                ...this.state.user,
                                                bio: newBio,
                                            },
                                        });
                                    }}
                                />
                            );
                        }}
                    />
                    <Route path="/users/:id" component={OtherProfile} />
                    <Route path="/search" component={FindPeople} />
                    <Route path="/" exact component={Menu} />
                </BrowserRouter>
            </div>
        );
    }
}
