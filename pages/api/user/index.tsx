import { withIronSession } from "next-iron-session";
import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from 'next';




const handler = (_req: any, res: NextApiResponse) => {
    const { method, query }: any = _req
    let user: any = _req.session.get("user")
    if (user) {
        res.send(user)
    }
    res.send({})


}


export default withIronSession(handler, {
    cookieName: "user",
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    }
}
);
