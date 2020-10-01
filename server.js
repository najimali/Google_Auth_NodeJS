const express = require("express"),
    app = express(),
    passport = require("passport"),
    mongoose = require("mongoose"),
    keys = require("./config/keys"),
    cookieSession = require("cookie-session"),
    authRoutes = require("./routes/auth_routes"),
    passportSetup = require("./config/passport-setup"),
    profileRoutes = require("./routes/profile-routes"),
    User = require("./models/User");

//connecting mongoose
mongoose.connect(keys.mongodb.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// set view engine
app.set("view engine", "ejs");

// set up session cookies
app.use(
    cookieSession({
        // milliseconds of a day
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey]
    })
);

// User.deleteMany({}, (allUser) => {
//     console.log("All user deleted");
//     console.log(allUser);
// });

// initialize passport
app.use(passport.initialize());

app.use(passport.session());

// set up routes
app.use("/", authRoutes);
app.use("/profile", profileRoutes);

// create home route
app.get("/", (req, res) => {
    res.render("home", { user: req.user });
});
//Setup Local Host
const hostname = "localhost",
    port = "3000";

app.listen(port, hostname, (req, res) => {
    console.log(` Server running at http://${hostname}:${port}/`);
});
