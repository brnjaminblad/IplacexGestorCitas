// Modelo que representa una cita almacenada en SQLite.
export interface Quote {
  id?: number;
  text: string;
  author: string;
}