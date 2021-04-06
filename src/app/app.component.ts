import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  showMenu = false;

  constructor(router: Router) {
    router.events.subscribe(() => {
      this.showMenu = false;
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
