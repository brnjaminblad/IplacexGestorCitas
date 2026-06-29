import { Injectable } from '@angular/core';

export interface AppSettings {
  allowDelete: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings: AppSettings = {
    allowDelete: true
  };

  async getSettings(): Promise<AppSettings> {
    return this.settings;
  }

  async saveSettings(settings: AppSettings) {
    this.settings = settings;
  }
}