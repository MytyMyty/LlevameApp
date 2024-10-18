import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPlacesPage } from './add-places.page';

describe('AddPlacesPage', () => {
  let component: AddPlacesPage;
  let fixture: ComponentFixture<AddPlacesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
