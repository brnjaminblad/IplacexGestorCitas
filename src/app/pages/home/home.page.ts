import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuoteDbService } from '../../services/quote-db.service';
import { SettingsService } from '../../services/settings.service';
import { Quote } from '../../models/quote.model';
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';
import { QuoteFormComponent } from '../../components/quote-form/quote-form.component';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
  IonContent, IonButton, IonIcon, IonFab, IonFabButton, IonList, IonItem, IonLabel 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    QuoteCardComponent,
    QuoteFormComponent,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
    IonContent, IonButton, IonIcon, IonFab, IonFabButton, IonList, IonItem, IonLabel
  ]
})
export class HomePage implements OnInit {
  quotes: Quote[] = [];
  quote: Quote | null = null;
  openModal: boolean = false;
  allowDelete: boolean = false; // State variable bound to your *ngIf templates

  constructor(
    private quoteDb: QuoteDbService,
    private settingsService: SettingsService
  ) {
    addIcons({ addOutline, trashOutline });
  }

  // Angular standard initial hook
  async ngOnInit() {
    await this.cargarListaCitas();
  }

  // IONIC VIEW LIFECYCLE HOOK: Triggers automatically every time you navigate back here
  async ionViewWillEnter() {
    await this.cargarConfiguraciones(); // Re-fetch toggle state from Preferences storage
    await this.cargarListaCitas();      // Keep list records synchronized
  }

  async cargarListaCitas() {
    this.quotes = await this.quoteDb.obtenerCitas();
    
    if (this.quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.quotes.length);
      this.quote = this.quotes[randomIndex];
    } else {
      this.quote = { text: 'No hay citas registradas. ¡Agrega una nueva!', author: 'Sistema' };
    }
  }

  async cargarConfiguraciones() {
    const config = await this.settingsService.getSettings();
    this.allowDelete = config.allowDelete; // Force data bindings to update instantly
    console.log('Home refresh complete. Current delete privilege:', this.allowDelete);
  }

  async addQuote(nuevaCita: any) {
    await this.quoteDb.addQuote(nuevaCita);
    this.openModal = false;
    await this.cargarListaCitas();
  }

  async handleDeleteQuote(id: any) {
    if (id) {
      await this.quoteDb.deleteQuote(Number(id));
      await this.cargarListaCitas();
    }
  }
}
