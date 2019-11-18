import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './services/theme.service';
import { Router, NavigationEnd } from '@angular/router';
declare let gtag: (...args: any[]) => void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'whatdoweplay';
  isDarkTheme: Observable<boolean>;

  constructor(private themeService: ThemeService, public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'xx-xxxxx-xx', { page_path: event.urlAfterRedirects });
      }
    });
  }




  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
}
