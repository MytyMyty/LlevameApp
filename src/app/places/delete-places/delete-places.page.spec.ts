import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeletePlacesPage } from './delete-places.page';

describe('DeletePlacesPage', () => {
  let component: DeletePlacesPage;
  let fixture: ComponentFixture<DeletePlacesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePlacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
