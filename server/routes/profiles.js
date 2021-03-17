// Routing & express setup:

const express = require("express");
const path = require("path");
const uidSafe = require("uid-safe");
const router = express.Router();
const database = require("../../database/database.js");
const s3 = require("./s3.js");

// Multer setup

const multer = require("multer");

const diskStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        const destinationDirectory = __dirname + "/../uploads";
        callback(null, destinationDirectory);
    },
    filename: (request, file, callback) => {
        uidSafe(24).then((uuid) => {
            const originalExtension = path.extname(file.originalname);
            const filename = uuid + originalExtension;
            callback(null, filename);
        });
    },
});
const uploader = multer({
    limits: {
        fileSize: 5242880, // = 5MB in bytes
    },
    storage: diskStorage,
});

// Route to get user data for profile

router.get("/api/user", (request, response) => {
    database
        .getUserById(request.session.user.id)
        .then((user) => {
            response.json({
                user: user.rows[0],
            });
        })
        .catch((error) => console.log("Error with getting user data", error));
});

// Route for uploading the profile pics

router.post(
    "/api/user/profilepic",
    uploader.single("file"),
    (request, response) => {
        if (request.files === null) {
            return response.status(400).json({
                error: "No file uploaded",
            });
        }
        // Upload to S3
        s3.uploadFile(request.file).then((result) => {
            console.log("S3 result", result);

            const fileURL = s3.getS3URL(request.file.filename);
            const id = request.session.user.id;
            database
                .updatePhoto(id, fileURL)
                .then((results) => {
                    response.json({
                        success: true,
                        image: results.rows[0],
                    });
                })
                .catch((error) => {
                    console.log("error with updating profilepic", error);
                });
        });
    }
);

// Route for updating the bio

router.post("/api/user/bio", (request, response) => {
    const email = request.session.user.email;
    const bio = request.body.bio;
    database
        .updateBio(email, bio)
        .then((result) => {
            response.json({
                success: true,
                result,
            });
        })
        .catch((error) => {
            console.log("error with updating bio", error);
        });
});

module.exports = router;
