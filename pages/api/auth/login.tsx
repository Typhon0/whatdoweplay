import passport from "passport";
import nextConnect from "next-connect";
import SteamStrategy from "passport-steam";
import { ironSession } from "next-iron-session";

const session = ironSession({
  cookieName: "user",
  password: process.env.SECRET_COOKIE_PASSWORD,
  ttl: 7200,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      method,
      { session: false, failureRedirect: "/login" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    )(req, res);
  });

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3000/api/auth/return",
      realm: "http://localhost:3000/",
      apiKey: process.env.STEAM_API_KEY,
    },
    (identifier, profile, done) => {
      profile.identifier = identifier;
      done(null, profile);
    }
  )
);

passport.serializeUser((user, next) => {
  next(null, user);
});

passport.deserializeUser((obj, next) => {
  next(null, obj);
});

export default nextConnect()
  .use(session)
  .use(passport.initialize())
  .get(async (req: any, res: any) => {
    try {
      let user: any = req.session.get("user");
      if (!user) {
        user = await authenticate("steam", req, res);
      }
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(401).send(error.message);
    }
  });
