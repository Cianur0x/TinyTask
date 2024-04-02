import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionsComponent } from './opinions.component';

describe('OpinionsComponent', () => {
  let component: OpinionsComponent;
  let fixture: ComponentFixture<OpinionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpinionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpinionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
