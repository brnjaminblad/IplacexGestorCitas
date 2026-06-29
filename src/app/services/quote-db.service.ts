import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteDbService {

  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  public quotes: Quote[] = [];

  private ready = false;

  constructor() {}

  // 🔥 inicialización segura
  async init() {
    this.db = await this.sqlite.createConnection(
      'quotesdb',
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        author TEXT NOT NULL
      );
    `);

    await this.loadQuotes();
    this.ready = true;
  }

  // 🔥 check estado
  isInitialized(): boolean {
    return this.ready;
  }

async loadQuotes() {
  const res = await this.db.query('SELECT * FROM quotes', []);

  // FORZAR NUEVA REFERENCIA (IMPORTANTE PARA ANGULAR)
  this.quotes = [...(res.values ?? [])];

  console.log('DB LOAD:', this.quotes);
}

  async addQuote(q: Quote) {
    await this.db.run(
      'INSERT INTO quotes (text, author) VALUES (?, ?)',
      [q.text, q.author]
    );

    await this.loadQuotes();
  }

  async deleteQuote(id: number) {
    await this.db.run(
      'DELETE FROM quotes WHERE id = ?',
      [id]
    );

    await this.loadQuotes();
  }
}