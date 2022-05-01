import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCrudPostComponent } from './app-crud-post.component';

describe('AppCrudPostComponent', () => {
  let component: AppCrudPostComponent;
  let fixture: ComponentFixture<AppCrudPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCrudPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCrudPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
