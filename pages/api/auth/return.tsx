import { withIronSession } from "next-iron-session";
import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from 'next';




const handler = (_req: any, res: NextApiResponse) => {
    const { method, query }: any = _req
    console.log(_req.user)
    let STEAMID = query['openid.identity'].split('/').pop()
    axios.post(
        'http://localhost:3000/api/users/getProfileSummaries', [STEAMID]).then(async response => {
            // res.send(response.data.response.players)
            _req.session.set("user", response.data.response.players[0]);
            await _req.session.save();
            res.redirect('/');
        }).catch(err => {
            console.log(err)
        });
}

export default withIronSession(handler, {
    cookieName: "user",
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    }
}
);
