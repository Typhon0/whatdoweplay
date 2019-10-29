import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: "app-steamid-form",
  templateUrl: "./steamid-form.component.html",
  styleUrls: ["./steamid-form.component.scss"]
})
export class SteamidFormComponent implements OnInit {


  userForm: FormGroup;

  constructor(private fb: FormBuilder,private apiService: ApiService) { }

  ngOnInit() {

    /* Initiate the form structure */
    this.userForm = this.fb.group({
      userid: '',
      friends_id: this.fb.array([this.fb.group({id:''})])
    })
  }

  get friendsID() {
    return this.userForm.get('friends_id') as FormArray;
  }

  
  addSellingPoint() {
    this.friendsID.push(this.fb.group({id:''}));
  }

  deleteSellingPoint(index) {
    this.friendsID.removeAt(index);
  }

  onSubmit(data){
    this.apiService.getOwnedGames("76561197960434622").subscribe((res)=>{
      console.log(res)
    });
   
  }


}
