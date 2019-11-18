import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

@Component({
  selector: 'app-steamid-form',
  templateUrl: './steamid-form.component.html',
  styleUrls: ['./steamid-form.component.scss']
})
export class SteamidFormComponent implements OnInit {
  userForm: FormGroup;
  friendForm: FormGroup;
  friends: any;


  constructor(private fb: FormBuilder, private router: Router, private dataservice: DataService, private apiservice: ApiService,
              public googleAnalyticsService: GoogleAnalyticsService) { }

  ngOnInit() {
    /* Initiate the form structure */
    this.userForm = this.fb.group({
      userid: '',
      friends_id: this.fb.array([this.fb.group({ id: '' })])
    });

    this.friendForm = this.fb.group({
      checkboxes: new FormArray([])
    });
  }

  get friendsID() {
    return this.userForm.get('friends_id') as FormArray;
  }

  get checkboxes() {
    return this.friendForm.get('checkboxes') as FormArray;
  }

  addSellingPoint() {
    this.friendsID.push(this.fb.group({ id: '' }));
  }

  deleteSellingPoint(index) {
    this.friendsID.removeAt(index);
  }

  onSubmit(data) {

    this
      .googleAnalyticsService
      .eventEmitter('submit_steam_id', 'steamid', 'user', 'click', 10);

    this.apiservice.resolve(data.userid).then((userid) => {

      this.friendForm = this.fb.group({
        checkboxes: new FormArray([])
      });
      this.checkboxes.push(new FormControl(userid));

      this.apiservice.getUserFriends(userid).subscribe((userFriend: any) => {
        this.apiservice.resolveFriends(userFriend.friendslist.friends).subscribe((friendRes: any) => {
          this.friends = friendRes.response.players;
        });
      });

    });
  }

  onSubmitFriend(data) {
    this
    .googleAnalyticsService
    .eventEmitter('submit_selected_friends', 'steamid', 'user_friends', 'click', 10);
    if (data.checkboxes.length > 0) {
      this.dataservice.saveIds(data.checkboxes);
      this.router.navigate(['/compare']);
    }
  }


  onCheckChange(event) {

    /* Selected */
    if (event.checked) {
      // Add a new control in the arrayForm
      this.checkboxes.push(new FormControl(event.source.value));
    } else {

      // find the unselected element
      let i = 0;

      this.checkboxes.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.source.value) {
          // Remove the unselected element from the arrayForm
          this.checkboxes.removeAt(i);
          return;
        }

        i++;
      });
    }
  }
}
