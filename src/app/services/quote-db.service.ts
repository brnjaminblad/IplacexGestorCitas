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
        this.db = await this.sqlite.createConnection(dbName, false, 'no-encryption', 1, false);
        await this.db.open();
        await this.db.execute(`
          CREATE TABLE IF NOT EXISTS citas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            texto TEXT NOT NULL,
            autor TEXT NOT NULL
          );
        `);
        this.dbReady = true;
      } else {
        this.dbReady = true;
      }
      return true;
    } catch (e) {
      console.error('Fallo crítico al levantar SQLite:', e);
      this.dbReady = false;
      return false;
    }
  }

  async init() {
    await this.inicializarBaseDeDatos();
  }

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

    if (!Capacitor.isNativePlatform()) {
      const localData = localStorage.getItem('web_quotes');
      return localData ? JSON.parse(localData) : [];
    }

    const res = await this.db.query('SELECT * FROM citas;');
    return (res.values || []).map((row: any) => ({
      id: row.id,
      text: row.texto,
      author: row.autor
    }));
  }

  // .:: Métodos alias para compatibilidad con home.page.ts ::.
  async addQuote(cita: Quote): Promise<void> {
    await this.insertarCita(cita);
  }

  async deleteQuote(id: number): Promise<void> {
    await this.eliminarCita(id);
  }

  async insertarCita(cita: Quote): Promise<void> {
    if (!this.dbReady) return;

    if (!Capacitor.isNativePlatform()) {
      const actuales = await this.obtenerCitas();
      const nuevaCita = { ...cita, id: Date.now() };
      actuales.push(nuevaCita);
      localStorage.setItem('web_quotes', JSON.stringify(actuales));
      return;
    }

    await this.db.run('INSERT INTO citas (texto, autor) VALUES (?, ?);', [cita.text, cita.author]);
  }

  async eliminarCita(id: number): Promise<void> {
    if (!this.dbReady) return;

    if (!Capacitor.isNativePlatform()) {
      const actuales = await this.obtenerCitas();
      const filtradas = actuales.filter(c => c.id !== id);
      localStorage.setItem('web_quotes', JSON.stringify(filtradas));
      return;
    }

    await this.db.run('DELETE FROM citas WHERE id = ?;', [id]);
  }
}
