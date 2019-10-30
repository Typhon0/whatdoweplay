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
    userId.forEach(id => {
      this.apiService.getOwnedGames(id).subscribe((res: any) => {
        const games = Array<Game>();
        res.response.games.forEach(element => {
          games.push(new Game(element));
        });
        this.users.push(new User(id, games));
      });
    });

    // todo merge and remove duplicate

  }

}
