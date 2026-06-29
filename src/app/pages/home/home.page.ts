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
  allowDelete: boolean = false;
  
  // .:: Índice de la cita actualmente mostrada ::.
  indiceCitaActual: number = 0;

  constructor(
    private quoteDb: QuoteDbService,
    private settingsService: SettingsService
  ) {
    addIcons({ addOutline, trashOutline });
  }

  async ngOnInit() {
    await this.cargarListaCitas();
  }

  async ionViewWillEnter() {
    await this.cargarConfiguraciones();
    await this.cargarListaCitas();
  }

  async cargarListaCitas() {
    this.quotes = await this.quoteDb.obtenerCitas();
    
    if (this.quotes.length > 0) {
      // .:: Al cargar o refrescar, nos aseguramos de no desbordar el array ::.
      if (this.indiceCitaActual >= this.quotes.length) {
        this.indiceCitaActual = 0;
      }
      this.quote = this.quotes[this.indiceCitaActual];
    } else {
      this.quote = { text: 'No hay citas registradas. ¡Agrega una nueva!', author: 'Sistema' };
    }
  }

  // .:: Avanza a la siguiente cita en bucle ::.
  avanzarSiguienteCita() {
    if (this.quotes.length > 1) {
      // .:: Calcula el siguiente índice usando módulo para volver al inicio ::.
      this.indiceCitaActual = (this.indiceCitaActual + 1) % this.quotes.length;
      this.quote = this.quotes[this.indiceCitaActual];
    }
  }

  async cargarConfiguraciones() {
    const config = await this.settingsService.getSettings();
    this.allowDelete = config.allowDelete;
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