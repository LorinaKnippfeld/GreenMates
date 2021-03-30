const express = require("express");
// const database = require("../../database/database.js");
const router = express.Router();
const axios = require("axios");

// arrange secrets for heroku

let token;
if (process.env.NODE_ENV == "production") {
    token = process.env.TREFLE_TOKEN; // in prod the secrets are environment variables
} else {
    token = require("../secrets.json").TREFLE_TOKEN; // in dev they are in secrets.json which is listed in .gitignore
}

router.get("/api/findplants/:query", async (request, response) => {
    const query = request.params.query;
    console.log("this is the query", query);
    const result = await axios.get(
        `https://trefle.io/api/v1/plants/search?token=${token}&q=${query}`
    );
    console.log(result);
    response.json(result.data.data);
});

router.get("/api/client-token", async (request, response) => {
    const params = {
        origin: "https://green-mates.herokuapp.com/",
        ip: request.session.user.id,
        token: token,
    };
    try {
        const result = await axios.post(
            "https://trefle.io/api/auth/claim",
            params,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        response.json(result.data.token);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
