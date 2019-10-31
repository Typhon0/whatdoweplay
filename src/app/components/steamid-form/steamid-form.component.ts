import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-steamid-form',
  templateUrl: './steamid-form.component.html',
  styleUrls: ['./steamid-form.component.scss']
})
export class SteamidFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private dataservice: DataService) { }

  ngOnInit() {
    /* Initiate the form structure */
    this.userForm = this.fb.group({
      userid: '',
      friends_id: this.fb.array([this.fb.group({ id: '' })])
    });
  }

  get friendsID() {
    return this.userForm.get('friends_id') as FormArray;
  }

  addSellingPoint() {
    this.friendsID.push(this.fb.group({ id: '' }));
  }

  deleteSellingPoint(index) {
    this.friendsID.removeAt(index);
  }

  onSubmit(data) {
    const userId = Array<number>();
    userId.push(data.userid);
    data.friends_id.forEach(elem => {
      userId.push(elem.id);
    });
    this.dataservice.saveIds(userId);
    this.router.navigate(['/compare']);



  }
}
