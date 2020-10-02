const router = require("express").Router();

const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.redirect("/auth/login");
    } else {
        next();
    }
};

router.get("/", isLoggedIn, (req, res) => {
    res.render("profile", { user: req.user });
});

module.exports = router;
