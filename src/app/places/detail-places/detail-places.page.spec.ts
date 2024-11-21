import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailPlacesPage } from './detail-places.page';

describe('DetailPlacesPage', () => {
  let component: DetailPlacesPage;
  let fixture: ComponentFixture<DetailPlacesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPlacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
