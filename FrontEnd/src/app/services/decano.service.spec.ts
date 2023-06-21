import { TestBed } from '@angular/core/testing';

import { DecanoService } from './decano.service';

describe('DecanoService', () => {
  let service: DecanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
