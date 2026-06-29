import { Component } from '@angular/core';
import {
  IonApp,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonToggle,
  IonRouterOutlet
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    FormsModule,

    IonApp,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonToggle,
    IonRouterOutlet
  ]
})
export class AppComponent {

  settings = {
    allowDelete: true
  };

  constructor(private settingsService: SettingsService) {
    this.loadSettings();
  }

  async loadSettings() {
    this.settings = await this.settingsService.getSettings();
  }

  async save() {
    await this.settingsService.saveSettings(this.settings);
  }

}