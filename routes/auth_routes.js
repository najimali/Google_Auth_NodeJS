const router = require("express").Router(),
    passport = require("passport");

// create home route
router.get("/", (req, res) => {
    res.render("home", { user: req.user });
});
router.get("/auth/login", (req, res) => {
    res.render("login", { user: req.user });
});
//Showing Consent Page
// auth with google+
router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get(
    "/auth/google/redirect",
    //at this time we have code from google & now exchanging with google then it goes to passport call back in the Google Strategy.
    passport.authenticate("google"),
    (req, res) => {
        //You have login in & show the user Home Page
        console.log("you reached the redirect URI");
        res.redirect("/profile");
    }
);

router.get("/auth/logout", (req, res) => {
    req.logout();
    console.log("logout");
    res.redirect("/");
});

module.exports = router;
