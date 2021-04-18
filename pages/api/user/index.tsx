import { withIronSession } from "next-iron-session";
import { NextApiResponse } from "next";

const handler = (_req: any, res: NextApiResponse) => {
  const user: any = _req.session.get("user");
  if (user) {
    res.send(user);
  }
  res.status(200);
};

export default withIronSession(handler, {
  cookieName: "user",
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
