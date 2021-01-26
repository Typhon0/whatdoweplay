import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_STEAM_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_STEAM_API_KEY;
const resolveCache = new Map();
const STATUS_SUCCESS = 1;

export const getOwnedGames = (userId): Promise<AxiosResponse> => {
  return axios.get(
    `IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${userId}&format=json&include_appinfo=true&include_played_free_games=true`
  );
};

export const getProfileSummaries = (useridArray): Promise<AxiosResponse> => {
  return axios.get(
    `ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${useridArray.toString()}`
  );
};

export const getOwnedGamesForUsers = (userId: number[]) => {
  let response = [];
  userId.forEach((id) => {
    response.push(getOwnedGames(id));
  });
  return Promise.all(response);
};

/**
 * Resolve info based on id, profile, or url.
 * Rejects promise if a profile couldn't be resolved.
 * @param info Something to resolve e.g 'https://steamcommunity.com/id/xDim'
 * @returns  Profile ID
 */
export const resolveUser = (info): Promise<number> => {
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
    if (resolveCache.has(id)) {
      return Promise.resolve(resolveCache.get(id));
    }

    return axios
      .get(`ISteamUser/ResolveVanityURL/v1?key=${API_KEY}&vanityurl=${id}`)
      .then((res: any) => {
        return res.data.response.success === STATUS_SUCCESS
          ? resolveCache.set(id, res.data.response.steamid).get(id)
          : Promise.reject(new TypeError(res.data.response.message));
      });
  }

  return Promise.reject(new TypeError("Invalid format"));
};

export const getUserFriends = (id) => {
  return axios.get(
    `ISteamUser/GetFriendList/v0001?key=${API_KEY}&steamid=${id}`
  );
};

export const resolveFriends = (friends) => {
  return getProfileSummaries(friends.map((elem) => elem.steamid));
};
