const express = require("express"),
    app = express(),
    passport = require("passport"),
    mongoose = require("mongoose"),
    keys = require("./config/keys"),
    cookieSession = require("cookie-session"),
    authRoutes = require("./routes/auth_routes"),
    passportSetup = require("./config/passport_setup"),
    profileRoutes = require("./routes/profile-routes"),
    User = require("./models/User");

//COONECTING MONGOOSE
mongoose.connect(keys.mongodb.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//APP CONFIG
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//SET UP COOKIE SESSION
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

//INITIALIZE PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//SETUP ROUTES
app.use("/", authRoutes);
app.use("/profile", profileRoutes);

//LISTING SERVER
const hostname = "localhost",
    port = "3000";
app.listen(port, hostname, (req, res) => {
    console.log(` Server running at http://${hostname}:${port}/`);
});
