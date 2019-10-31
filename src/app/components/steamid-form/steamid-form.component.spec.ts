import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteamidFormComponent } from './steamid-form.component';

describe('SteamidFormComponent', () => {
  let component: SteamidFormComponent;
  let fixture: ComponentFixture<SteamidFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteamidFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteamidFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
