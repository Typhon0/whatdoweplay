import axios, { AxiosResponse } from "axios";


export const getOwnedGames = (userId): Promise<Array<Game>> =>
  new Promise((resolve, reject) => {
    axios
      .get(`api/users/getOwnedGames/${userId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        throw err;
      });
  });

export const getProfileSummaries = (useridArray): Promise<Array<User>> =>
  new Promise((resolve, reject) => {
    axios
      .post("api/users/getProfileSummaries", useridArray)
      .then((response) => {
        resolve(response.data.response.players);
      })
      .catch((err) => {
        throw err;
      });
  });

export const getOwnedGamesForUsers = (userId: string[]): Promise<Array<Game>> =>
  new Promise((resolve, reject) =>
    axios
      .post("api/users/getOwnedGames", userId)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        throw err;
      })
  );

/**
 * Resolve info based on id, profile, or url.
 * Rejects promise if a profile couldn't be resolved.
 * @param info Something to resolve e.g 'https://steamcommunity.com/id/xDim'
 * @returns  Profile ID
 */
export const resolveUser = (info: string): Promise<string> =>
  new Promise((resolve, reject) => {
    axios
      .post("api/users/resolveUser", { info })
      .then((response: AxiosResponse) => {
        resolve(response.data.steamID64);
      })
      .catch((err) => {
        throw err;
      });
  });

export const getUserFriends = (id): Promise<Array<Friends>> =>
  new Promise((resolve, reject) => {
    axios
      .get(`api/users/getFriends/${id}`)
      .then((response) => {
        resolve(response.data.friendslist.friends);
      })
      .catch((err) => {
        throw err;
      });
  });

export const resolveFriends = (friends): Promise<Array<User>> =>
  new Promise((resolve, reject) => {
    getProfileSummaries(friends.map((elem) => elem.steamid)).then((data) => {
      resolve(data);
    });
  });

export const login = (): Promise<any> =>
  new Promise((resolve, reject) => {
    axios
      .post("/api/auth/login")
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((err) => {
        throw err;
      });
  });

export const logout = (): Promise<void> =>
  new Promise((resolve, reject) => {
    axios
      .post("/api/auth/logout")
      .then(() => {
        resolve();
      })
      .catch((err) => {
        throw err;
      });
  });
