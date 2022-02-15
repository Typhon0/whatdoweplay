import { withIronSessionApiRoute } from "iron-session/next";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const STEAMID = _req.query["openid.identity"].toString().split("/").pop();
  const domain =
    process.env.NODE_ENV == "development"
      ? "localhost:3000"
      : process.env.VERCEL_URL;
  axios
    .post(`http://${domain}/api/users/getProfileSummaries`, [STEAMID])
    .then(async (response) => {

      _req.session.user = response.data.response.players[0];
      await _req.session.save();
      res.redirect("/");
    });
};

export default withIronSessionApiRoute(handler, {
  cookieName: "user",
  password: process.env.SECRET_COOKIE_PASSWORD,

});
