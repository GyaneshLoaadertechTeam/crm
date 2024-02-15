import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorProfileComponent } from './actor-profile.component';

describe('ActorProfileComponent', () => {
  let component: ActorProfileComponent;
  let fixture: ComponentFixture<ActorProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActorProfileComponent]
    });
    fixture = TestBed.createComponent(ActorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
