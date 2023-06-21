import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCarreraPage } from './add-carrera.page';

describe('AddCarreraPage', () => {
  let component: AddCarreraPage;
  let fixture: ComponentFixture<AddCarreraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddCarreraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
