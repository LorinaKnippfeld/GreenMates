// Setup express & react

const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

// Setup routing:

const authRouter = require("./routes/auth.js");

// Setup cookie stuff

const cookieSession = require("cookie-session");

app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secret: "dnfhkjfdhghkjfdh4365zghhdgkj",
    })
);

// Setup csrf token

const csurf = require("csurf");
app.use(csurf());
app.use(function (request, response, next) {
    response.cookie("mytoken", request.csrfToken());
    next();
});

// Middleware for json use

app.use(express.json());

// Setup static data with react

app.use(express.static(path.join(__dirname, "..", "client", "public")));

// Setup react stuff

app.use(compression());

// Use routing

app.use(authRouter);

// Redirect user based on login status

// User is logged out route:
// If logged in, redirect to logged in world

app.get("/welcome", (request, response) => {
    if (request.session.user) {
        return response.redirect(302, "/");
    }
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// User is logged in route:
// If not logged in, redirected to welcome

app.get("*", function (request, response) {
    if (!request.session.user) {
        return response.redirect(302, "/welcome");
    }

    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// Setup server

app.listen(process.env.PORT || 3001, function () {
    console.log("Server works");
});
