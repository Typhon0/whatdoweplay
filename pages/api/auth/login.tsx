import passport from "passport";
import nextConnect from "next-connect";
import SteamStrategy from "passport-steam";
import { ironSession } from "iron-session/express";
import { NextApiRequest, NextApiResponse } from "next";

const session = ironSession({
  cookieName: "user",
  password: process.env.SECRET_COOKIE_PASSWORD,
  ttl: 7200,

});
const domain =
  process.env.NODE_ENV == "development"
    ? "localhost:3000"
    : process.env.VERCEL_URL;

const authenticate = (method, req:NextApiRequest, res:NextApiResponse):Promise<User> =>
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
      returnURL: `http://${domain}/api/auth/return`,
      realm: `http://${domain}/`,
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
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      let user: User = req.session.user;
      if (!user) {
        user = await authenticate("steam", req, res);
      }
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(401).send(error.message);
    }
  });
