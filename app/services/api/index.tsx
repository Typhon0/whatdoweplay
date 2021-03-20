import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.NOW_URL;
const API_KEY = process.env.NEXT_PUBLIC_STEAM_API_KEY;
const resolveCache = new Map();
const STATUS_SUCCESS = 1;

export const getOwnedGames = (userId): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(
      `api/users/getOwnedGames/${userId}`
    ).then(response => {
      resolve(response.data)
    }).catch(err => {
      throw err
    });
  })
};

export const getProfileSummaries = (useridArray): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(
      'api/users/getProfileSummaries', useridArray).then(response => {
        resolve(response.data)
      }).catch(err => {
        throw err
      });
  })

};

export const getOwnedGamesForUsers = (userId: string[]): Promise<any> => {
  return new Promise((resolve, reject) => {

    return axios.post(`api/users/getOwnedGames`, userId).then(response => {
      resolve(response.data)
    }).catch(err => {
      throw err
    });
  })
};

/**
 * Resolve info based on id, profile, or url.
 * Rejects promise if a profile couldn't be resolved.
 * @param info Something to resolve e.g 'https://steamcommunity.com/id/xDim'
 * @returns  Profile ID
 */
export const resolveUser = (info: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios.post(`api/users/resolveUser`, { info }).then((response: AxiosResponse) => {
      console.log(response.data)
      resolve(response.data)
    }).catch(err => {
      throw err
    });
  })
};

export const getUserFriends = (id): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(
      `api/users/getFriends/${id}`
    ).then(response => {
      resolve(response.data)
    }).catch(err => {
      throw err
    });
  })
};

export const resolveFriends = (friends): Promise<any> => {
  return new Promise((resolve, reject) => {
    getProfileSummaries(friends.map((elem) => elem.steamid)).then((data) => {
      resolve(data)
    });
  })
};
