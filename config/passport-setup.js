const passport = require("passport"),
    GoogleStrategy = require("passport-google-oauth20").Strategy,
    keys = require("./keys"),
    User = require("../models/User");

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
passport.use(
    // options for google strategy
    new GoogleStrategy(
        {
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            //callback which is set in Developer Google Console
            callbackURL: "/auth/google/redirect"
        },
        (accessToken, refreshToken, profile, done) => {
            // passport callback function
            // check if user already exists in our db with the given profile ID
            User.findOne({ googleId: profile.id }).then((currentUser) => {
                if (currentUser) {
                    // already have this user
                    console.log("user is: ", currentUser);
                    //if we already have a record with the given profile ID
                    done(null, currentUser);
                } else {
                    //if not, create a new user
                    new User({
                        googleId: profile.id,
                        username: profile.displayName,
                        thumbnail: profile.photos[0].value
                    })
                        .save()
                        .then((newUser) => {
                            console.log("New User Added to db ");
                            console.log(newUser);
                            done(null, newUser);
                        });
                }
            });
        }
    )
);
