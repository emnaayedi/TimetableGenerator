import { TestBed } from '@angular/core/testing';

import { MatierEnsService } from './matier-ens.service';

describe('MatierEnsService', () => {
  let service: MatierEnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatierEnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
