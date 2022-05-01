import { TestBed } from '@angular/core/testing';

import { PostProxyServiceService } from './post-proxy-service.service';

describe('PostProxyServiceService', () => {
  let service: PostProxyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostProxyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
