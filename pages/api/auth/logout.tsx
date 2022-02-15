
import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const { method } = _req;
  switch (method) {
    case "POST":
      _req.session.destroy();
      res.status(200).send({});
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default withIronSessionApiRoute(handler, {
  cookieName: "user",
  password: process.env.SECRET_COOKIE_PASSWORD,

});
