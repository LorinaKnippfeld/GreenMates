const express = require("express");
// const database = require("../../database/database.js");
const token = require("../secrets.json").TREFLE_TOKEN;
const router = express.Router();
const axios = require("axios");

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
        origin: "https://git.heroku.com/green-mates.git",
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
