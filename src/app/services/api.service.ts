import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
