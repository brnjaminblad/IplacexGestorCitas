import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteDbService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private dbReady: boolean = false;

  async inicializarBaseDeDatos(): Promise<boolean> {
    try {
      const dbName = 'quotes_db';

      if (Capacitor.isNativePlatform()) {
        // Flujo Nativo Móvil
        this.db = await this.sqlite.createConnection(dbName, false, 'no-encryption', 1, false);
      } else {
        // Flujo para Pruebas en Navegador Web (Jeep-SQLite)
        await customElements.whenDefined('jeep-sqlite');
        await this.sqlite.initWebStore();
        
        // REPARACIÓN COMPILADOR: Se añade 'false' (readonly) como segundo argumento requerido
        const conexionExiste = await this.sqlite.isConnection(dbName, false);
        if (conexionExiste.result) {
          this.db = await this.sqlite.retrieveConnection(dbName, false);
        } else {
          this.db = await this.sqlite.createConnection(dbName, false, 'no-encryption', 1, false);
        }
      }
      
      await this.db.open();
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS citas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          texto TEXT NOT NULL,
          autor TEXT NOT NULL
        );
      `);
      this.dbReady = true;
      return true;
    } catch (e) {
      console.error('Fallo SQLite:', e);
      return false;
    }
  }

  // Métodos puente compatibles con el controlador antiguo de tu Home de forma exacta
  async init() {
    await this.inicializarBaseDeDatos();
  }

  // Mock para simular la reactividad esperada de quotes$ en home.page.ts
  get quotes$() {
    return {
      subscribe: async (callback: (quotes: Quote[]) => void) => {
        const list = await this.obtenerCitas();
        callback(list);
      },
      pipe: () => ({
        subscribe: async (callback: (quotes: Quote[]) => void) => {
          const list = await this.obtenerCitas();
          callback(list);
        }
      })
    };
  }

  async obtenerCitas(): Promise<Quote[]> {
    if (!this.dbReady) return [];
    const res = await this.db.query('SELECT * FROM citas;');
    // Mapear de nombres de columna de Base de Datos hacia el modelo en inglés
    return (res.values || []).map((row: any) => ({
      id: row.id,
      text: row.texto,
      author: row.autor
    }));
  }

  async addQuote(cita: Quote): Promise<void> {
    await this.insertarCita(cita);
  }

  async deleteQuote(id: number): Promise<void> {
    await this.eliminarCita(id);
  }

  async insertarCita(cita: Quote): Promise<void> {
    if (!this.dbReady) return;
    await this.db.run('INSERT INTO citas (texto, autor) VALUES (?, ?);', [cita.text, cita.author]);
    if (!Capacitor.isNativePlatform()) await this.sqlite.saveToStore('quotes_db');
  }

  async eliminarCita(id: number): Promise<void> {
    if (!this.dbReady) return;
    await this.db.run('DELETE FROM citas WHERE id = ?;', [id]);
    if (!Capacitor.isNativePlatform()) await this.sqlite.saveToStore('quotes_db');
  }
}