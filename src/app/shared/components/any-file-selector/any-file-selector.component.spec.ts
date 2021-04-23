import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyFileSelectorComponent } from './any-file-selector.component';

describe('AnyFileSelectorComponent', () => {
  let component: AnyFileSelectorComponent;
  let fixture: ComponentFixture<AnyFileSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnyFileSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyFileSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
