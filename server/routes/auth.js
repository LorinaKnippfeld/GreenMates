// Routing setup:

const express = require("express");
const database = require("../../database/database.js");
const bcrypt = require("../../database/bcrypt.js");

const router = express.Router();

// Save register data to database

router.post("/api/register", (request, response) => {
    const { firstname, lastname, email, password } = request.body;
    console.log(request.body);
    if (!firstname || !lastname || !email || !password) {
        response.json({
            success: false,
            error: "Please fill out all fields.",
            firstname: firstname,
            lastname: lastname,
        });
    } else {
        bcrypt
            .genHash(password)
            .then((hashedPassword) => {
                database
                    .addUser(firstname, lastname, email, hashedPassword)
                    .then((results) => {
                        request.session.user = results.rows[0];
                        response.json({
                            success: true,
                        });
                        response.redirect(302, "/");
                    })
                    .catch((error) => {
                        console.log("Error with adding user to db", error);
                        response.json({
                            success: false,
                            error:
                                "Sorry, something went wrong. Please try again.",
                            firstname,
                            lastname,
                        });
                    });
            })
            .catch((error) => {
                console.log("Error with bcrypt", error);
                response.json({
                    success: false,
                    error: "Sorry, something went wrong. Please try again.",
                    firstname,
                    lastname,
                });
            });
    }
});

module.exports = router;
