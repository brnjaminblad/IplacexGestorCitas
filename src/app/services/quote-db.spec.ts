import { TestBed } from '@angular/core/testing';

import { QuoteDb } from './quote-db';

describe('QuoteDb', () => {
  let service: QuoteDb;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteDb);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
