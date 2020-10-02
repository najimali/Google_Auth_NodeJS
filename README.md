# [Watch the playlist](https://www.youtube.com/watch?v=sakQbeRjgwg&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x)

### What is OAuth

It stands for Open Authentication & is one of the approaches for user authentication inside your app & allows third-party services like Google, Facebook, Github, etc.

As a user, it's very often we choose to use our Google (or Facebook, Twitter, etc) account to sign into a web application, as it is more convenient and quick than creating a new login account. Usually, the process goes like this:

1. You click the "Sign in with Google" button
2. You get redirected to a Google consent screen, asking if you grant 3. 3. permission for the app to gain access to your Google profile info
   You click "Allow"
3. Get redirected to the actual application

### The OAuth Flow

The following flow chart shows the big picture of OAuth flow, from the developer's perspective.

![alt OAuth Image](https://res.cloudinary.com/practicaldev/image/fetch/s--IutBbPPw--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/25pglob5fgs6ghti47mm.png)

### [Watch Complete Flow](https://www.youtube.com/watch?v=RGJFAfvhQZg&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x&index=14)

### Register your app - [Link](https://www.youtube.com/watch?v=9x66l93iEW0&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x&index=6)

### Flow -

1. User sign in browser
2. To go **/auth/google** with `passport.authenticate("google", { scope: ["profile", "email"] })` & scope. Scope tell the google this info is webapp is requesting so send it with code.
3. User grant permission.
4. Google sends the redirect code - this code is used to retrieve user info.
5. Redirect URL is set in Developer Google Console & it is **/auth/google/redirect**.
6. Before redirecting finally we have passport.authenticate('google') as middleware & this time we have code so it fires passport js callback.
7. In the passport callback, it provides accessToken,refreshToken, profile, etc. Here we lookup or create a new user in our database.
8. After that we serialize users so that browser remembers the cookie.

### Serialize User

It means since we are login so we are creating a unique code for the user
& send it to the browser so that every time the user visits the browser, the browser remembers the user. Serialize take two para, user & done. & we are creating unique code for the user based on id created by MongoDB but not based google id because the user may be login with Fb or twitter also so they don't have google id that's why id by , MongoDB is unique so like this ` done(null, user.id);`

### Deserialize User

Browser retriving info from cookie so that user dont have to sign in again & again & showing user profile.User is saved based on id created by mongo so use `User.findById(id).then((user) => { done(null, user); });`

### Setting up Cookie Session

-   It requires two para maxAge & key, maxAge is the time for which our browser remember the cookie & key is used to encrypt the cookie & it can be any random string

In the server.js file add this
`app.use( cookieSession({ // milliseconds of a day maxAge: 24 * 60 * 60 * 1000, keys: [keys.session.cookieKey] }) );`
