import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
axios.defaults.baseURL = process.env.STEAM_API_URL;
const API_KEY = process.env.STEAM_API_KEY;

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  const {
    method,
    query: { steamid },
  } = _req;
  switch (method) {
    case "GET":
      axios
        .get(`ISteamUser/GetFriendList/v0001?key=${API_KEY}&steamid=${steamid}`)
        .then((response) => {
          res.send(response.data);
        })
        .catch((err) => { res.status(500).send(err.message) });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
