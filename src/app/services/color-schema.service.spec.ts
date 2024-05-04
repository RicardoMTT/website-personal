import { TestBed } from '@angular/core/testing';

import { ColorSchemaService } from './color-schema.service';

describe('ColorSchemaService', () => {
  let service: ColorSchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorSchemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
