const express = require("express");
const router = express.Router();
const axios = require("axios");
const database = require("../../database/database.js");

// arrange secrets for heroku

let token;
if (process.env.NODE_ENV == "production") {
    token = process.env.TREFLE_TOKEN; // in prod the secrets are environment variables
} else {
    token = require("../secrets.json").TREFLE_TOKEN; // in dev they are in secrets.json which is listed in .gitignore
}

// plant search routes

router.get("/api/findplants/:query", async (request, response) => {
    const query = request.params.query;
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

// plant garden routes

router.get("/api/plant-garden/", async (request, response) => {
    const result = await database.getPlants(request.session.user.id);
    const currentPlants = result.rows;
    response.json(currentPlants);
});

router.post("/api/plant-garden/add-plant/", async (request, response) => {
    const { plant_id, common_name, scientific_name, image_url } = request.body;
    try {
        const result = await database.addPlant(
            plant_id,
            request.session.user.id,
            common_name,
            scientific_name,
            image_url
        );
        response.json({
            success: true,
            newPlant: result.rows[0],
        });
    } catch (error) {
        console.log("error with adding plant", error);
    }
});

router.post("/api/plant-garden/delete-plant/", async (request, response) => {
    const { id } = request.body;
    try {
        const result = await database.deletePlant(id);
        response.json({
            success: true,
        });
    } catch (error) {
        console.log("error with deleting plant", error);
    }
});

module.exports = router;
