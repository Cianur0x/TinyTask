import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTagsComponent } from './show-tags.component';

describe('ShowTagsComponent', () => {
  let component: ShowTagsComponent;
  let fixture: ComponentFixture<ShowTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTagsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
