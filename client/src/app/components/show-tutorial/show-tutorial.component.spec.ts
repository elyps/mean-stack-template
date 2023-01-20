import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTutorialComponent } from './show-tutorial.component';

describe('ShowTutorialComponent', () => {
  let component: ShowTutorialComponent;
  let fixture: ComponentFixture<ShowTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTutorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
