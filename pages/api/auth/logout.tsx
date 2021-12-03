import { ironSession } from "iron-session/express";
import axios from "axios";
import { NextApiResponse } from "next";
import { send } from "process";

const handler = (_req: any, res: NextApiResponse) => {
  const { method } = _req;
  switch (method) {
    case "POST":
      _req.session.destroy();
      res.status(200).send({});

      //res.setHeader("Cache-Control", "no-store, max-age=0");
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default withIronSession(handler, {
  cookieName: "user",
  password: process.env.SECRET_COOKIE_PASSWORD,

});
