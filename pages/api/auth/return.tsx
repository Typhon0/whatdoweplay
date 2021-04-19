import { withIronSession } from "next-iron-session";
import axios from "axios";
import { NextApiResponse } from "next";

const handler = (_req: any, res: NextApiResponse) => {
  const { query }: any = _req;
  const STEAMID = query["openid.identity"].split("/").pop();
  const domain =
    process.env.NODE_ENV == "development"
      ? "localhost:3000"
      : process.env.VERCEL_URL;
  axios
    .post(`http://${domain}/api/users/getProfileSummaries`, [STEAMID])
    .then(async (response) => {
      // res.send(response.data.response.players)
      _req.session.set("user", response.data.response.players[0]);
      await _req.session.save();
      res.redirect("/");
    })
    .catch((err) => {});
};

export default withIronSession(handler, {
  cookieName: "user",
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
