// setup axios & useState

/*

import { useState, useEffect } from "react";
import axios from "./myAxios.js";

// define variables against typos

const STATUS_NO_REQUEST = "no-request";
const STATUS_REQUEST_MADE_BY_YOU = "request-made-by-you";
const STATUS_REQUEST_MADE_TO_YOU = "request-made-to-you";
const STATUS_ACCEPTED = "request-accepted";

const ACTION_MAKE_REQUEST = "make-request";
const ACTION_CANCEL_REQUEST = "cancel";
const ACTION_ACCEPT_REQUEST = "accept";
const ACTION_UNFRIEND = "unfriend";

// friend button function

export default function FriendButton(props) {
    const { otherId } = props;
    const [status, setStatus] = useState();

    // useEffect to get the current state of my friendship

    useEffect(() => {
        axios.get("api/friend-request/" + otherId).then((response) => {
            const { status } = response.data;
            setStatus(status);
        });
    }, []);

    // sendAction to make / cancel / accept / unfriend

    const sendAction = async (action) => {
        const response = await axios.post(
            "api/friend-request/" + action + "/" + otherId
        );

        const { newStatus } = response.data;
        setStatus(newStatus);
    };

    // conditional rendering of button

    if (status == STATUS_NO_REQUEST) {
        return (
            <button onClick={(e) => sendAction(ACTION_MAKE_REQUEST)}>
                Make request
            </button>
        );
    } else if (status == STATUS_ACCEPTED) {
        return (
            <button onClick={(e) => sendAction(ACTION_UNFRIEND)}>
                Unfriend
            </button>
        );
    } else if (status == STATUS_REQUEST_MADE_BY_YOU) {
        return (
            <button onClick={(e) => sendAction(ACTION_CANCEL_REQUEST)}>
                Cancel request
            </button>
        );
    } else if (status == STATUS_REQUEST_MADE_TO_YOU) {
        return (
            <button onClick={(e) => sendAction(ACTION_ACCEPT_REQUEST)}>
                Accept
            </button>
        );
    } else {
        return <button> Planti </button>;
    }
}

*/
