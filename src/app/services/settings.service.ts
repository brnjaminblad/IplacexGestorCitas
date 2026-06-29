import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class SettingsService {

  private key = 'app_settings';

  async getSettings() {
    const { value } = await Preferences.get({ key: this.key });

    return value ? JSON.parse(value) : {
      allowDelete: true
    };
  }

  async saveSettings(settings: any) {
    await Preferences.set({
      key: this.key,
      value: JSON.stringify(settings)
    });
  }
}