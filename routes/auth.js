// Routing setup:

const express = require("express");
const database = require("../database.js");
const bcrypt = require("../bcrypt.js");

const router = express.Router();

// Save register data to database

router.post("/welcome", (request, response) => {
    const { firstname, lastname, email, password } = request.body;
    if (!firstname || !lastname || !email || !password) {
        console.log("please fill it all out");
    } else {
        bcrypt.genHash(password).then((hashedPassword) => {
            database
                .addUser(firstname, lastname, email, hashedPassword)
                .then((userData) => {
                    request.session.user = userData.rows[0];
                    response.json({
                        success: true,
                    });
                    response.redirect(302, "/");
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
});
