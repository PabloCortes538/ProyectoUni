import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMateriasPage } from './add-materias.page';

describe('AddMateriasPage', () => {
  let component: AddMateriasPage;
  let fixture: ComponentFixture<AddMateriasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddMateriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
