const express = require("express");
// const database = require("../../database/database.js");
const token = require("../secrets.json").TREFLE_TOKEN;
console.log(token);
const router = express.Router();
const axios = require("axios");

router.get("/api/findplants/:query", async (request, response) => {
    const query = request.params.query;
    const result = await axios.get(
        `https://trefle.io/api/v1/plants?token=${token}&q=${query}`
    );
    response.json(result.data.data);
});

router.get("/api/client-token", async (request, response) => {
    const params = {
        origin: "https://planti-vz.herokuapp.com",
        ip: request.session.user.id,
        token: token,
    };
    console.log(params);
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
