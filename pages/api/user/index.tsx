import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next";

const handler = (_req: any, res: NextApiResponse) => {
  const user: any = _req.session.user;
  if (user) {
    res.send(user);
  }
  res.status(200);
};

export default withIronSessionApiRoute(handler, {
  cookieName: "user",
  password: process.env.SECRET_COOKIE_PASSWORD,

});
