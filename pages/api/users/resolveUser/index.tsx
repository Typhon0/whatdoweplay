import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

axios.defaults.baseURL = process.env.STEAM_API_URL;
const API_KEY = process.env.STEAM_API_KEY;
const STATUS_SUCCESS = 1;

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  resolveUser(_req.body.info)
    .then((steamIdResolved: string) => {
      res.status(200).send({ steamID64: steamIdResolved });
    })
    .catch((err) => { res.status(500).send(err.message) });
};

/**
 * Resolve info based on id, profile, or url.
 * Rejects promise if a profile couldn't be resolved.
 * @param info Something to resolve e.g 'https://steamcommunity.com/id/xDim'
 * @returns  Profile ID
 */
const resolveUser = (info: string): Promise<string> => {
  const reProfileBase = String.raw`(?:(?:(?:(?:https?)?:\/\/)?(?:www\.)?steamcommunity\.com)?)?\/?`;
  const reProfileURL = RegExp(
    String.raw`${reProfileBase}(?:profiles\/)?(\d{17})`,
    "i"
  );
  const reProfileID = RegExp(
    String.raw`${reProfileBase}(?:id\/)?(\w{2,32})`,
    "i"
  );
  if (!info) {
    return Promise.reject(new TypeError("Invalid/no app provided"));
  }
  const urlMatch = info.match(reProfileURL);
  if (urlMatch !== null) {
    return Promise.resolve(urlMatch[1]);
  }

  const idMatch = info.match(reProfileID);
  if (idMatch !== null) {
    const id = idMatch[1];
    return axios
      .get(`ISteamUser/ResolveVanityURL/v1?key=${API_KEY}&vanityurl=${id}`)
      .then((res: AxiosResponse) => {
        return res.data.response.success === STATUS_SUCCESS
          ? Promise.resolve(res.data.response.steamid)
          : Promise.reject(new TypeError(res.data.response.message));
      });
  }

  return Promise.reject(new TypeError("Invalid format"));
};

export default handler;
