import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite';

import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteDbService {

  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  // 🔥 Estado reactivo
  private quotesSubject = new BehaviorSubject<Quote[]>([]);
  quotes$ = this.quotesSubject.asObservable();

  private ready = false;

  constructor() {}

async init() {

  // SOLO EN WEB: esperar jeep-sqlite
  if (Capacitor.getPlatform() === 'web') {
    await customElements.whenDefined('jeep-sqlite');
  }

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
  isInitialized(): boolean {
    return this.ready;
  }

async loadQuotes() {
  if (!this.db) return;

  const res = await this.db.query('SELECT * FROM quotes');

  const data: Quote[] = res.values ?? [];

  this.quotesSubject.next(data);
}

async addQuote(q: Quote) {
  if (!this.db) {
    console.warn('DB no inicializada aún');
    return;
  }

  await this.db.run(
    'INSERT INTO quotes (text, author) VALUES (?, ?)',
    [q.text, q.author]
  );

  await this.loadQuotes();
}

async deleteQuote(id: number) {
  if (!this.db) return;

  await this.db.run(
    'DELETE FROM quotes WHERE id = ?',
    [id]
  );

  await this.loadQuotes();
}
}