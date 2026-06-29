import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

// Homologación exacta con tu settings.page.ts y settings.page.html
export interface AppSettings {
  allowDelete: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly KEY_BORRAR = 'permitir_borrar_inicio';

  async getSettings(): Promise<AppSettings> {
    const { value } = await Preferences.get({ key: this.KEY_BORRAR });
    return {
      allowDelete: value === 'true'
    };
  }

  async saveSettings(settings: AppSettings): Promise<void> {
    await Preferences.set({
      key: this.KEY_BORRAR,
      value: settings.allowDelete ? 'true' : 'false'
    });
  }
}