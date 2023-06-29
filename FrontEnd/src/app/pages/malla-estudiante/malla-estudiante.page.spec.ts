import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MallaEstudiantePage } from './malla-estudiante.page';

describe('MallaEstudiantePage', () => {
  let component: MallaEstudiantePage;
  let fixture: ComponentFixture<MallaEstudiantePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MallaEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
