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
                return database
                    .addUser(firstname, lastname, email, hashedPassword)
                    .then((results) => {
                        request.session.user = results.rows[0];
                        response.json({
                            success: true,
                        });
                    })
                    .catch((error) => {
                        console.log("Error with adding user to db", error);
                        response.status(500).json({
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

// Create login route

router.post("/api/login", (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        return response.json({
            success: false,
            error: "Please provide email and password",
        });
    } else {
        database
            .getUserByEmail(email)
            .then((results) => {
                const user = results.rows[0];
                bcrypt.compare(password, user.password_hash).then((valid) => {
                    if (!valid) {
                        return response.json({
                            success: false,
                            error:
                                "Email and password are not correct.. Please try again",
                        });
                    } else {
                        request.session.user = user;
                        return response.json({
                            success: true,
                        });
                    }
                });
            })
            .catch((error) => {
                console.log(
                    "Something went wrong with finding the user in the db",
                    error
                );
                return response.status(400).json({
                    success: false,
                });
            });
    }
});

module.exports = router;
