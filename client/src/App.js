// setup classic component

import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import axios from "./myAxios";
import Uploader from "./Uploader.js";
import ProfilePic from "./ProfilePic.js";
import Profile from "./Profile.js";
import OtherProfile from "./OtherProfile.js";
import Menu from "./Menu.js";
import FriendsAndWallabys from "./FriendsAndWallabys.js";
import Chat from "./Chat.js";
import PlantFinder from "./PlantFinder.js";
import PlantGarden from "./PlantGarden.js";

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
            <div className="app">
                <div className="appProfilePic">
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
                                this.setState({
                                    user,
                                    uploaderVisible: false,
                                })
                            }
                            closeHandler={() => {
                                this.setState({ uploaderVisible: false });
                            }}
                        />
                    )}
                </div>

                <BrowserRouter>
                    <Route
                        path="/user"
                        render={() => {
                            return (
                                <Profile
                                    user={user}
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
                    <Route path="/" exact component={Menu} />
                    <Route path="/friends" component={FriendsAndWallabys} />
                    <Route path="/chat" component={Chat} />
                    <Route path="/findplants" component={PlantFinder} />
                    <Route path="/plant-garden" component={PlantGarden} />
                </BrowserRouter>
            </div>
        );
    }
}
