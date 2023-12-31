import { TestBed } from '@angular/core/testing';

import { NormalAlertService } from './normal-alert.service';

describe('NormalAlertService', () => {
  let service: NormalAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormalAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
