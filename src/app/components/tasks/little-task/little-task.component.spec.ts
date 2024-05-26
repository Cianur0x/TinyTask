import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LittleTaskComponent } from './little-task.component';

describe('LittleTaskComponent', () => {
  let component: LittleTaskComponent;
  let fixture: ComponentFixture<LittleTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LittleTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LittleTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
