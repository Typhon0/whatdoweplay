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
      getOwnedGames(steamid)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {});
      break;
    case "POST":
      getOwnedGamesForUsers(_req.body)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {});
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

const getOwnedGames = (steamId) => {
  return new Promise((resolve) => {
    axios
      .get(
        `IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=true`
      )
      .then((response) => {
        resolve(response.data);
      });
  });
};

const getOwnedGamesForUsers = (userId: string[]) => {
  return new Promise((resolve) => {
    const response = [];
    userId.forEach((id) => {
      response.push(getOwnedGames(id));
    });
    Promise.all(response).then((data) => {
      const result = [];
      data.forEach((element, index) => {
        result.push({ steamId: userId[index], games: element.response.games });
      });
      resolve(result);
    });
  });
};

export default handler;
