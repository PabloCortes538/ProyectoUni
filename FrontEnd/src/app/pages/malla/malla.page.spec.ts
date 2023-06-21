import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MallaPage } from './malla.page';

describe('MallaPage', () => {
  let component: MallaPage;
  let fixture: ComponentFixture<MallaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MallaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
