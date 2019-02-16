import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTakerComponent } from './image-taker.component';

describe('ImageTakerComponent', () => {
  let component: ImageTakerComponent;
  let fixture: ComponentFixture<ImageTakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
