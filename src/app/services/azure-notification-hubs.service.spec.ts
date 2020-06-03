import { TestBed } from '@angular/core/testing';

import { AzureNotificationHubsService } from './azure-notification-hubs.service';

describe('AzureNotificationHubsService', () => {
  let service: AzureNotificationHubsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureNotificationHubsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
