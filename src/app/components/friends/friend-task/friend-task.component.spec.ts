import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendTaskComponent } from './friend-task.component';

describe('FriendTaskComponent', () => {
  let component: FriendTaskComponent;
  let fixture: ComponentFixture<FriendTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
