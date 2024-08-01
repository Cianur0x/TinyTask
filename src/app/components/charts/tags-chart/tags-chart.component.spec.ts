import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsChartComponent } from './tags-chart.component';

describe('TagsChartComponent', () => {
  let component: TagsChartComponent;
  let fixture: ComponentFixture<TagsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
