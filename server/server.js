// Setup express & react

const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

// Setup routing:

const authRouter = require("./routes/auth.js");

// Setup cookie stuff

const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secret: "dnfhkjfdhghkjfdh4365zghhdgkj",
    })
);

// Middleware for json use

app.use(express.json());

// Setup html & css

app.use(express.static("../client"));

// Weird react things:

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// Redirect user based on login status

app.get("/welcome", (request, response) => {
    if (request.session.user) {
        return response.redirect(302, "/");
    }
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// Setup server

app.listen(process.env.PORT || 3001, function () {
    console.log("Server works");
});
