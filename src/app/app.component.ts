import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, settingsOutline } from 'ionicons/icons';
import { 
  IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, 
  IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenuToggle 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, 
    IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenuToggle
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  constructor() {
    // .:: Registra los iconos globales del menú lateral ::.
    addIcons({ homeOutline, settingsOutline });
  }
}
