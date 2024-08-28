import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeTasksComponent } from './tree-tasks.component';

describe('TreeTasksComponent', () => {
  let component: TreeTasksComponent;
  let fixture: ComponentFixture<TreeTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreeTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
