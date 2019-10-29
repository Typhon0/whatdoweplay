import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareUsersComponent } from './compare-users.component';

describe('CompareUsersComponent', () => {
  let component: CompareUsersComponent;
  let fixture: ComponentFixture<CompareUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
