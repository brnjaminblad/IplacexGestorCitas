import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService, AppSettings } from '../../services/settings.service';
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
  IonContent, IonList, IonItem, IonLabel, IonToggle 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  // REPAIR: Changed from styleUrls pointing to a missing scss file to a clean inline array properties field
  styles: [],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
    IonContent, IonList, IonItem, IonLabel, IonToggle
  ]
})
export class SettingsPage implements OnInit {
  settings: AppSettings = {
    allowDelete: false
  };

  constructor(private settingsService: SettingsService) {}

  async ngOnInit() {
    const data = await this.settingsService.getSettings();
    this.settings.allowDelete = data.allowDelete;
  }

  async toggleChanged() {
    await this.settingsService.saveSettings(this.settings);
  }
}
