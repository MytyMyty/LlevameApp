import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePlacesPage } from './update-places.page';

describe('UpdatePlacesPage', () => {
  let component: UpdatePlacesPage;
  let fixture: ComponentFixture<UpdatePlacesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePlacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
