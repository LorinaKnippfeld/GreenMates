import axios from "./myAxios.js";

export const LOAD_FRIENDS = "load friends";
export const ACCEPT_FRIEND = "accept friend";
export const UNFRIEND = "unfriend friend";

export const loadFriends = async () => {
    const result = await axios.get("/api/friend-requests/friends");
    const friendList = result.data;
    return {
        type: LOAD_FRIENDS,
        friends: friendList,
    };
};
