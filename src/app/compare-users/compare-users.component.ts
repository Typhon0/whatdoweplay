import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';
import { User } from '../models/user';
import { Game } from '../models/game';

@Component({
  selector: 'app-compare-users',
  templateUrl: './compare-users.component.html',
  styleUrls: ['./compare-users.component.scss']
})
export class CompareUsersComponent implements OnInit {

  constructor(private apiService: ApiService, private dataservice: DataService) { }
  users = Array<User>();
  sameGames = Array<Game>();
  ngOnInit() {
    const userId = this.dataservice.retrieveIDs();


    new Promise((resolve, reject) => {
      let games = Array<Game>();
      this.apiService.getOwnedGamesForUsers(userId).subscribe(res => {
        res.forEach(elem => {
          elem.response.games.forEach(elem => {
            games.push(new Game(elem))
          })
        })
        resolve(games);
      })
    }).then((games: Array<Game>) => {
      console.log(games)
      let filtered = games.filter((v,i,a)=>a.findIndex(t=>(t.appid === v.appid))!=i)


      console.log(filtered)
      this.sameGames = filtered;
    })

  }
}
