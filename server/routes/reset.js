// Setup express, datbase and bcrypt

const express = require("express");
const database = require("../../database/database.js");
const bcrypt = require("../../database/bcrypt.js");
const ses = require("../ses.js");

// Routing setup

const router = express.Router();

// Setup random string

const cryptoRandomString = require("crypto-random-string");

// Post route for requesting password reset code

router.post("/api/resetcode", (request, response) => {
    const { email } = request.body;
    if (!email) {
        return response.json({
            success: false,
            error: "Please provide your email address",
        });
    } else {
        database
            .getUserByEmail(email)
            .then((result) => {
                if (result.rows.length > 0) {
                    const secretcode = cryptoRandomString({
                        length: 8,
                    });
                    database
                        .addResetCode(email, secretcode)
                        .then(() => {
                            var subj = "Social Network Password Reset";
                            var msg = "your resetcode: " + secretcode;
                            ses.sendEmail(email, msg, subj)
                                .then(() => {
                                    return response.json({
                                        success: true,
                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                    response.json({
                                        success: false,
                                        error:
                                            "Unfortunately we could not send you an email. Please try again or check your email account",
                                    });
                                });
                        })
                        .catch((error) => {
                            console.log("Could not get reset code", error);
                        });
                } else {
                    console.log("User is not in database :(");
                    return response.json({
                        success: false,
                        error: "Please try again",
                    });
                }
            })
            .catch((error) => {
                console.log("Something wrong with checking user in db", error);
                return response.json({
                    success: false,
                    error: "Something went wrong",
                });
            });
    }
});

router.post("/api/updatepw", (request, response) => {
    console.log("request body", request.body);
    const { email, secretcode, newPassword } = request.body;

    database
        .getResetCode(email)
        .then(({ rows }) => {
            console.log("get reset code", rows, secretcode);
            if (secretcode === rows[0].secretcode) {
                bcrypt.genHash(newPassword).then((new_password_hashed) => {
                    database
                        .updatePassword(email, new_password_hashed)
                        .then((result) => {
                            console.log("pw reset worked", result);
                            response.json({ success: true });
                        })
                        .catch((error) => {
                            console.log(
                                "Updating pw in database did not work",
                                error
                            );
                            response.json({ success: false, error });
                        });
                });
            } else {
                response.json({
                    success: false,
                    error: "Something is wrong with the secret code",
                });
            }
        })
        .catch((error) => {
            console.log("Getting reset code for pw update did not work", error);
            response.json({ success: false });
        });
});

module.exports = router;
