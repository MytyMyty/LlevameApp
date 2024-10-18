import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPlacesPage } from './list-places.page';

describe('ListPlacesPage', () => {
  let component: ListPlacesPage;
  let fixture: ComponentFixture<ListPlacesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
