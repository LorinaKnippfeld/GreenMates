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
            <h3>Friends</h3>
            <h2>Friend requests</h2>
            {!wallabys && <div>You have no current requests</div>}
            {wallabys &&
                wallabys.map((wallaby) => {
                    return (
                        <div key={wallaby.id} className="wallaby">
                            <Link to={"/user/" + wallaby.id}></Link>
                            <img
                                className="wallabyPicture"
                                src={wallaby.profile_pic_url}
                            />
                            {wallaby.firstname} {wallaby.lastname}
                            <button
                                onClick={(e) =>
                                    dispatch(acceptFriends(wallaby.id))
                                }
                            >
                                Accept Friend
                            </button>
                        </div>
                    );
                })}

            <h2>Friend List</h2>
            {!friends && <div>You have no friends</div>}
            {friends &&
                friends.map((friend) => {
                    return (
                        <div className="friendList" key={friend.firstname}>
                            <Link to={"/user/" + friend.id}></Link>
                            <img
                                className="friendPicture"
                                src={friend.profile_pic_url}
                            />
                            {friend.firstname}
                            {friend.lastname}
                            <button
                                onClick={(e) => dispatch(unfriend(friend.id))}
                            >
                                Unfriend
                            </button>
                        </div>
                    );
                })}
            <Link className="linkHomeSearch" to="/">
                Back
            </Link>
        </div>
    );
}
