import { TestBed, inject } from '@angular/core/testing';

import { AudienceService } from './audience.service';

describe('AudienceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudienceService]
    });
  });

  it('should be created', inject([AudienceService], (service: AudienceService) => {
    expect(service).toBeTruthy();
  }));
});
