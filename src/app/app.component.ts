import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  showMenu = false;
  backgroundPosition = '';

  constructor(router: Router) {
    router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }

      this.showMenu = false;

      document.getElementsByTagName('body')[0].scrollTo(0, 0);
    });
  }

  public toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  onClickedOutside(e: Event) {
    if (!this.showMenu) {
      return;
    }

    this.showMenu = false;
  }
}
