import { TestBed } from '@angular/core/testing';
import { PostProxyService } from './post-proxy-service.service';


describe('PostProxyServiceService', () => {
  let service: PostProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
