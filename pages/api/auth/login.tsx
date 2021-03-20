import passport from 'passport'
import nextConnect from 'next-connect'
import SteamStrategy from 'passport-steam'

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

export default nextConnect()
    .use(passport.initialize())
    .get(async (req: any, res: any) => {
        try {
            const user: any = await authenticate('steam', req, res)
            console.log(user)
            // session is the payload to save in the token, it may contain basic info about the user
            const session = { ...user }

            // await setLoginSession(res, session)

            res.status(200).send({ done: true })
        } catch (error) {
            console.error(error)
            res.status(401).send(error.message)
        }
    })
