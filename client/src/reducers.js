import {
    LOAD_FRIENDS,
    ACCEPT_FRIEND,
    UNFRIEND,
    ACTION_CHAT_MESSAGE,
    CHAT_MESSAGES,
    CLIENT_TOKEN,
} from "./actions.js";

// Friend button on friendlist

export default function (state = { messages: [] }, action) {
    if (action.type == LOAD_FRIENDS) {
        state = {
            ...state,
            friends: action.friends,
        };
    }

    if (action.type == ACCEPT_FRIEND) {
        state = {
            ...state,
            friends: state.friends.map((friend) => {
                if (friend.id === action.id) {
                    friend.accepted = true;
                }
                return friend;
            }),
        };
    }

    if (action.type == UNFRIEND) {
        state = {
            ...state,
            friends: state.friends.filter((friend) => {
                if (friend.id === action.id) {
                    return false;
                } else {
                    return true;
                }
            }),
        };
    }

    // Chat messages

    if (action.type == ACTION_CHAT_MESSAGE) {
        state = {
            ...state,
            messages: [...state.messages, ...action.messages],
        };
    }

    if (action.type == CHAT_MESSAGES) {
        state = {
            ...state,
            messages: action.messages,
        };
    }

    // Client token

    if (action.type == CLIENT_TOKEN) {
        state = {
            ...state,
            token: action.token,
        };
    }

    return state;
}
