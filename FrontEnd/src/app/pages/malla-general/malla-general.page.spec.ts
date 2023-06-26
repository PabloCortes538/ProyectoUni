import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MallaGeneralPage } from './malla-general.page';

describe('MallaGeneralPage', () => {
  let component: MallaGeneralPage;
  let fixture: ComponentFixture<MallaGeneralPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MallaGeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
