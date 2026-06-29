import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuoteDbService } from './services/quote-db.service';
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Esto suprime los errores NG8001 de manera definitiva
})
export class AppComponent implements OnInit {
  constructor(private quoteDb: QuoteDbService) {
    addIcons({ homeOutline, settingsOutline });
  }

  async ngOnInit() {
    await this.quoteDb.inicializarBaseDeDatos();
  }
}