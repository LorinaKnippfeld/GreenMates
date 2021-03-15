/*
/ Routing & express setup:

const express = require("express");
const database = require("../../database/database.js");
const router = express.Router();
const path = require("path");
const uidSafe = require("uid-safe");


// Multer setup 

const multer = require("multer");

const diskStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        const destinationDirectory = __dirname + "/uploads";
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

router.get("/user", (request, response) => {
    database.getUserById(request.session.userId)
        .then( user => {
            response.json({
                user : user.rows[0]
            });
        })
        .catch(error => console.log("Error with getting user data", error));

// Route for uploading the profile pics

router.post("/upload", (request, response)) => {
    if(request.files === null) {
        return response.status(400).json({
            error: "No file uploaded"
         });
    }
/* 
  // Upload to S3
    s3.uploadFile(request.file).then((result) => {
        console.log("S3 result", result);

        const fileURL = s3.getS3URL(request.file.filename);
        // TODO: Save file info to database
        database
            .uploadImage(
                fileURL,
                request.body.title,
                request.body.username,
                request.body.description
            )
            .then((results) => {
                response.json({
                    success: true,
                    image: results.rows[0],
                });
            })
            .catch((error) => {
                console.log("error");
            });
    });
});



}



module.exports = router;

*/
