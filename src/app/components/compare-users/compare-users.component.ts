import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { User } from '../../models/user';
import { Game } from '../../models/game';
import { intersectionBy } from 'lodash';
@Component({
  selector: 'app-compare-users',
  templateUrl: './compare-users.component.html',
  styleUrls: ['./compare-users.component.scss']
})
export class CompareUsersComponent implements OnInit {
  loader = false;

  constructor(private apiService: ApiService, private dataservice: DataService) { }
  sameGames = Array<Game>();
  ngOnInit() {
    const userId = this.dataservice.retrieveIDs();
    console.log(userId);
    this.loader = true;


    new Promise((resolve, reject) => {
      const users = Array<User>();
      this.apiService.getOwnedGamesForUsers(userId).subscribe(res => {
        res.forEach(elem => {
          if (elem.response.games !== undefined || elem.response.games.length > 0) {
            let i = 0;
            const games = Array<Game>();
            elem.response.games.forEach((gameJson: any) => {
              games.push(new Game(gameJson));
            });
            users.push(new User(userId[i], games));
            i++;
          }
        });
        resolve(users);
      });
    }).then((users: Array<User>) => {
      const gamesArray = users.map((user) => user.games);
      const filtered = intersectionBy(gamesArray, 'appid');
      this.sameGames = filtered[0];
      this.loader = false;

    });

  }
}
