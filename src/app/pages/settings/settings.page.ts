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

  // 🔥 SIEMPRE inicializado para evitar crash en template
  settings: AppSettings = {
    allowDelete: false
  };

  constructor(private settingsService: SettingsService) {}

  async ngOnInit() {
    const data = await this.settingsService.getSettings();

    // 🔥 merge seguro de datos
    this.settings = {
      allowDelete: data?.allowDelete ?? false
    };
  }

  async save() {
    if (!this.settings) return;

    await this.settingsService.saveSettings(this.settings);
  }
}