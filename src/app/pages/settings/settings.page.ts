import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService, AppSettings } from '../../services/settings.service';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonToggle,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.page.html',
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonToggle,
    IonHeader,
    IonToolbar,
    IonTitle
  ]
})
export class SettingsPage implements OnInit {

  settings!: AppSettings;

  constructor(private settingsService: SettingsService) {}

  async ngOnInit() {
    this.settings = await this.settingsService.getSettings();
  }

  async save() {
    await this.settingsService.saveSettings(this.settings);
  }
}