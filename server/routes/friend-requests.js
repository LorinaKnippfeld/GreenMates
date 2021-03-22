// Routing & express setup:

const express = require("express");
const router = express.Router();
const database = require("../../database/database.js");

// GET route receive current friend status

const STATUS_NO_REQUEST = "no-request";
const STATUS_ACCEPTED = "request-accepted";
const STATUS_REQUEST_MADE_BY_YOU = "request-made-by-you";
const STATUS_REQUEST_MADE_TO_YOU = "request-made-to-you";

router.get("/api/friend-request/:otherId", async (req, res) => {
    const userId = req.session.user.id;
    const { otherId } = req.params;

    const result = await database.getFriendRequest(userId, otherId);
    const friendRequest = result.rows.length > 0 ? result.rows[0] : false;

    if (!friendRequest) {
        // Friend request not found
        res.json({ status: STATUS_NO_REQUEST });
    } else if (friendRequest.accepted == true) {
        // Friend request accepted
        res.json({ status: STATUS_ACCEPTED });
    } else if (friendRequest.from_id == userId) {
        // Friend request not accepted, and made by user
        res.json({ status: STATUS_REQUEST_MADE_BY_YOU });
    } else {
        // Friend request not accepted, and made by other user
        res.json({ status: STATUS_REQUEST_MADE_TO_YOU });
    }
});

// Post route to create or change friend requests

const ACTION_MAKE_REQUEST = "make-request";
const ACTION_CANCEL_REQUEST = "cancel";
const ACTION_ACCEPT_REQUEST = "accept";
const ACTION_UNFRIEND = "unfriend";

router.post("/api/friend-request/:action/:otherId", async (req, res) => {
    const userId = req.session.user.id;
    const { otherId, action } = req.params;

    switch (action) {
        case ACTION_MAKE_REQUEST:
            await database.addFriendRequest(userId, otherId);
            res.json({ newStatus: STATUS_REQUEST_MADE_BY_YOU });
            break;

        case ACTION_CANCEL_REQUEST:
            await database.deleteFriendRequest(userId, otherId);
            res.json({ newStatus: STATUS_NO_REQUEST });
            break;

        case ACTION_ACCEPT_REQUEST:
            await database.setFriendRequestAccepted(userId, otherId);
            res.json({ newStatus: STATUS_ACCEPTED });
            break;

        case ACTION_UNFRIEND:
            await database.deleteFriendRequest(userId, otherId);
            res.json({ newStatus: STATUS_NO_REQUEST });
            break;

        default:
            res.status(400).json({ error: "Action not recognized." });
    }
});

// Get friend list overview

router.get("/api/friend-requests/friends", async (req, res) => {
    const userId = req.session.user.id;
    const result = await database.getFriends(userId);
    res.json(result.rows);
});

module.exports = router;
