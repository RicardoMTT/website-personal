import { TestBed } from '@angular/core/testing';

import { EfemeridesService } from './efemerides.service';

describe('EfemeridesService', () => {
  let service: EfemeridesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EfemeridesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
