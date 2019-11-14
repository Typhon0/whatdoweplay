import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';  // RxJS 6 syntax
import { Game } from '../models/game';
const resolveCache = new Map();
const reProfileBase = String.raw`(?:(?:(?:(?:https?)?:\/\/)?(?:www\.)?steamcommunity\.com)?)?\/?`;
const reProfileURL = RegExp(String.raw`${reProfileBase}(?:profiles\/)?(\d{17})`, 'i');
const reProfileID = RegExp(String.raw`${reProfileBase}(?:id\/)?(\w{2,32})`, 'i');
const STATUS_SUCCESS = 1;
const reID = /^\d{17}$/;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'https://cors-anywhere.herokuapp.com/https://api.steampowered.com/';
  apiKey = '210B2A656590F165F072AC2A80A9A626';
  constructor(private httpClient: HttpClient) { }


  public getOwnedGames(userId) {
    return this.httpClient.get(this.apiURL + 'IPlayerService/GetOwnedGames/v0001/?key='
      + this.apiKey + '&steamid=' + userId + '&format=json&include_appinfo=true&include_played_free_games=true');
  }

  public getProfileSummaries(useridArray) {
    return this.httpClient.get(this.apiURL + `ISteamUser/GetPlayerSummaries/v0002/?key=${this.apiKey}&steamids=${useridArray.toString()}`);
  }


  public getOwnedGamesForUsers(userId: number[]) {
    const response = [];
    userId.forEach(id => {
      response.push(this.getOwnedGames(id));
    });
    return forkJoin(response);
  }

  /**
   * Resolve info based on id, profile, or url.
   * Rejects promise if a profile couldn't be resolved.
   * @param info Something to resolve e.g 'https://steamcommunity.com/id/xDim'
   * @returns  Profile ID
   */
  resolve(info) {
    if (!info) {
      return Promise.reject(new TypeError('Invalid/no app provided'));
    }
    const urlMatch = info.match(reProfileURL);
    if ((urlMatch) !== null) {
      return Promise.resolve(urlMatch[1]);
    }

    const idMatch = info.match(reProfileID);
    if ((idMatch) !== null) {
      const id = idMatch[1];
      if (resolveCache.has(id)) {
        return Promise.resolve(resolveCache.get(id));
      }

      return this.httpClient.get(this.apiURL + `ISteamUser/ResolveVanityURL/v1?key=${this.apiKey}&vanityurl=${id}`).toPromise()
        .then((json: any) => json.response.success === STATUS_SUCCESS
          ? resolveCache.set(id, json.response.steamid).get(id)
          : Promise.reject(new TypeError(json.response.message))
        );
    }

    return Promise.reject(new TypeError('Invalid format'));
  }

  getUserFriends(id) {

    return this.httpClient
      .get(this.apiURL + `ISteamUser/GetFriendList/v0001?key=${this.apiKey}&steamid=${id}`);

  }

  resolveFriends(friends) {
    return this.getProfileSummaries(friends.map(elem => elem.steamid));
    // const response = [];
    // friends.forEach(friend => {
    //   response.push();
    // });
    // return forkJoin(response);

  }
}
