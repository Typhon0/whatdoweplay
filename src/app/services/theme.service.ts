import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkTheme = new BehaviorSubject<boolean>(true);
  isDarkTheme = this.darkTheme.asObservable();

  setDarkTheme(): void {
    this.darkTheme.next(!this.darkTheme.getValue());
  }
}
