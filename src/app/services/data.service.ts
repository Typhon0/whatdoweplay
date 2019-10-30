import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userIds: Array<number> = [];
  constructor() {

  }
  saveIds(ids: any) {
    this.userIds = ids;
  }
  retrieveIDs() {
    return this.userIds;
  }
}
