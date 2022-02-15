import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
axios.defaults.baseURL = process.env.STEAM_API_URL;
const API_KEY = process.env.STEAM_API_KEY;

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  const { method } = _req;
  switch (method) {
    case "POST":
      getProfileSummaries(_req.body)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => { res.status(500).send(err.message) });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

const getProfileSummaries = (userIdArray) => {
  return new Promise((resolve) => {
    axios
      .get(
        `ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${userIdArray.toString()}`
      )
      .then((response) => {
        resolve(response.data);
      });
  });
};

export default handler;
