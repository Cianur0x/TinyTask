import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioGeneralComponent } from './inicio-general.component';

describe('InicioGeneralComponent', () => {
  let component: InicioGeneralComponent;
  let fixture: ComponentFixture<InicioGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
