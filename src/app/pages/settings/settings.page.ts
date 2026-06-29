import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonItem, IonLabel, IonToggle
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonItem, IonLabel, IonToggle
  ]
})
export class SettingsPage {

  settings = { allowDelete: true };

  constructor(private settingsService: SettingsService) {}

  async ionViewWillEnter() {
    this.settings = await this.settingsService.getSettings();
  }

  async save() {
    await this.settingsService.saveSettings(this.settings);
  }
}