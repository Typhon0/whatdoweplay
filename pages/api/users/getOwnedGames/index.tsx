import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import SGDB from "steamgriddb";

axios.defaults.baseURL = process.env.STEAM_API_URL;
const API_KEY = process.env.STEAM_API_KEY;
const client = new SGDB(process.env.STEAM_GRID_DB_API_KEY);

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
        .catch((err) => { res.status(500).send(err.message) });

      break;
    case "POST":
      getOwnedGamesForUsers(_req.body)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => { res.status(500).send(err.message) });
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
        result.push({
          steamId: userId[index],
          games: element.response.games,
        });
      });

      const gamesArray = result.map((user) => user.games);
      const filtered = intersection(gamesArray);
      const resolved = [];

      Promise.all(filtered.map((v) => resolveGameImg(v))).then(
        (resolvedValues) => {
          resolvedValues.forEach((game) => {
            resolved.push(game);
          });
          return resolve(resolved);
        }
      );
    });
  });
};

const resolveGameImg = (game: Game): Promise<Game> => {
  // Get grid by Steam App Id
  return new Promise((resolve) => {
    return client
      .getGrids({
        type: "steam",
        id: game.appid,
        dimensions: ["342x482", "600x900"],
        types: ["static"],
      })
      .then((result: GameImage) => {
        if (!result[0]) {
          console.log("image not found for " + game.name);
        }
        game.steamgridInfo = result[0];
        resolve(game);
      });
  });
};

function intersection(inter) {
  const result = [];
  let lists;

  if (inter.length === 1) {
    lists = inter[0];
  } else {
    lists = inter;
  }

  for (let i = 0; i < lists.length; i++) {
    const currentList = lists[i];
    for (let y = 0; y < currentList?.length; y++) {
      const currentValue = currentList[y];
      if (
        result.findIndex((item) => item.appid === currentValue.appid) === -1
      ) {
        if (
          lists.filter(
            (obj) =>
              obj?.findIndex((item) => item.appid === currentValue.appid) == -1
          ).length == 0
        ) {
          result.push(currentValue);
        }
      }
    }
  }
  return result;
}
export default handler;
