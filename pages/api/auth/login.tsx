import passport from 'passport'
import nextConnect from 'next-connect'
import SteamStrategy from 'passport-steam'
import { ironSession } from "next-iron-session";

const session = ironSession({
    cookieName: "user",
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});

const authenticate = (method, req, res) =>
    new Promise((resolve, reject) => {
        passport.authenticate(method, { session: false, failureRedirect: '/login' }, (error, token) => {
            if (error) {
                reject(error)
            } else {
                console.log(token)
                resolve(token)
            }
        })(req, res)
    })

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/api/auth/return',
    realm: 'http://localhost:3000/',
    apiKey: process.env.NEXT_PUBLIC_STEAM_API_KEY
}, (identifier, profile, done) => {
    console.log(identifier)
    console.log(profile)
    console.log(done)
    profile.identifier = identifier;
    done(null, profile);
}))

passport.serializeUser((user, next) => {
    console.log(user);
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
            console.log(req.session.get("user"))
            let user: any = req.session.get("user");
            if (!user) {
                user = await authenticate('steam', req, res)
            }
            console.log(user)
            res.redirect('/');

        } catch (error) {
            console.error(error)
            res.status(401).send(error.message)
        }
    })
