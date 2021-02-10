import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Accueil', url: '/accueil', icon: 'home' },
    { title: 'À propos', url: '/a-propos', icon: 'help-circle' },
  ];

  constructor(
    private readonly platform: Platform,
  ) {
  }
}
