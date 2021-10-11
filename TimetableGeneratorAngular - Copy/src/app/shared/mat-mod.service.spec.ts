import { TestBed } from '@angular/core/testing';

import { MatModService } from './mat-mod.service';

describe('MatModService', () => {
  let service: MatModService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatModService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
