import axios from "./myAxios.js";

// friend button setup

export const LOAD_FRIENDS = "load friends";
export const ACCEPT_FRIEND = "accept friend";
export const UNFRIEND = "unfriend friend";
export const ACTION_CHAT_MESSAGE = "chat message";
export const CHAT_MESSAGES = "chat messages";

// plant finder client token setup

export const CLIENT_TOKEN = "get client token";

// friend button acions

export const loadFriends = async () => {
    const result = await axios.get("/api/friend-requests/friends");
    const friendList = result.data;
    return {
        type: LOAD_FRIENDS,
        friends: friendList,
    };
};

export const acceptFriends = async (otherId) => {
    const result = await axios.post("/api/friend-request/accept/" + otherId);
    const acceptFriends = result.data;
    return {
        type: ACCEPT_FRIEND,
        id: otherId,
    };
};

export const unfriend = async (otherId) => {
    const result = await axios.post("/api/friend-request/unfriend/" + otherId);
    return {
        type: UNFRIEND,
        id: otherId,
    };
};

// plant finder client token actions

export const getClientToken = async () => {
    const result = await axios.get("/api/client-token/");
    const token = result.data;
    console.log(result.data);
    return {
        type: CLIENT_TOKEN,
        token: token,
    };
};

// Chat messages

export async function chatMessages(messages) {
    return {
        type: CHAT_MESSAGES,
        messages,
    };
}

export const chatMessage = async (message) => {
    return {
        type: ACTION_CHAT_MESSAGE,
        messages: message,
    };
};
