// import React & axios

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { acceptFriends, unfriend, loadFriends } from "./actions.js";
import ProfilePic from "./ProfilePic.js";
import FindPeople from "./FindPeople.js";

// setup function

export default function FriendsAndWallabys(props) {
    const dispatch = useDispatch();

    const wallabys = useSelector((state) =>
        state.friends ? state.friends.filter((friend) => !friend.accepted) : []
    );

    const friends = useSelector(function (state) {
        if (state.friends) {
            return state.friends.filter((friend) => friend.accepted);
        } else {
            return [];
        }
    });

    useEffect(() => {
        dispatch(loadFriends());
    }, []);

    return (
        <div className="friendsPage">
            <div className="logo"></div>
            <h1>
                Search for other people here and see your list of current
                friends and outstanding friend requests.
            </h1>
            <h2>Friend requests</h2>
            <div className="wallabyWrapper">
                {!wallabys && <div>You have no current requests</div>}
                {wallabys &&
                    wallabys.map((wallaby) => {
                        return (
                            <div key={wallaby.id}>
                                <div className="wallaby">
                                    <ProfilePic url={wallaby.profile_pic_url} />

                                    <p>
                                        {wallaby.firstname} {""}
                                        {wallaby.lastname}
                                    </p>
                                    <button
                                        onClick={(e) =>
                                            dispatch(acceptFriends(wallaby.id))
                                        }
                                    >
                                        Accept Friend
                                    </button>
                                    <Link to={"/users/" + wallaby.id}>
                                        profile page
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <h3>Friends</h3>
            <h4>Friend List</h4>
            <div className="friendWrapper">
                {!friends && <div>You have no friends</div>}
                {friends &&
                    friends.map((friend) => {
                        return (
                            <div key={friend.firstname}>
                                <div className="friendList">
                                    <ProfilePic url={friend.profile_pic_url} />

                                    <p>
                                        {friend.firstname} {""}
                                        {friend.lastname}
                                    </p>
                                    <button
                                        onClick={(e) =>
                                            dispatch(unfriend(friend.id))
                                        }
                                    >
                                        Unfriend
                                    </button>
                                    <Link to={"/users/" + friend.id}>
                                        profile page
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <Link className="linkHomeSearch" to="/">
                Back
            </Link>
            <FindPeople />
        </div>
    );
}
