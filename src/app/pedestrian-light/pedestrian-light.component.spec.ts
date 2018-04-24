import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedestrianLightComponent } from './pedestrian-light.component';

describe('PedestrianLightComponent', () => {
  let component: PedestrianLightComponent;
  let fixture: ComponentFixture<PedestrianLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedestrianLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedestrianLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
