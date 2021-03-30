// import React & axios

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { acceptFriends, unfriend, loadFriends } from "./actions.js";

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

            {!wallabys && <div>You have no current requests</div>}
            {wallabys &&
                wallabys.map((wallaby) => {
                    return (
                        <div key={wallaby.id} className="wallabyWrapper">
                            <h2>Friend requests</h2>
                            <div className="wallaby">
                                <Link to={"/user/" + wallaby.id}>
                                    profile page
                                </Link>
                                <img src={wallaby.profile_pic_url} />
                                <div>
                                    {wallaby.firstname} {wallaby.lastname}
                                </div>
                                <button
                                    onClick={(e) =>
                                        dispatch(acceptFriends(wallaby.id))
                                    }
                                >
                                    Accept Friend
                                </button>
                            </div>
                        </div>
                    );
                })}

            <h3>Friends</h3>
            {!friends && <div>You have no friends</div>}
            {friends &&
                friends.map((friend) => {
                    return (
                        <div className="friendWrapper" key={friend.firstname}>
                            <h2>Friend List</h2>
                            <div className="friendList">
                                <Link to={"/user/" + friend.id}>
                                    profile page
                                </Link>
                                <img src={friend.profile_pic_url} />
                                <p>
                                    {friend.firstname}
                                    {friend.lastname}
                                </p>
                                <button
                                    onClick={(e) =>
                                        dispatch(unfriend(friend.id))
                                    }
                                >
                                    Unfriend
                                </button>
                            </div>
                        </div>
                    );
                })}
            <Link className="linkHomeSearch" to="/">
                Back
            </Link>
        </div>
    );
}
