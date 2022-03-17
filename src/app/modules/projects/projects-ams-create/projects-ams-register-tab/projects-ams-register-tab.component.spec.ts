import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAmsRegisterTabComponent } from './projects-ams-register-tab.component';

describe('ProjectsAmsRegisterTabComponent', () => {
  let component: ProjectsAmsRegisterTabComponent;
  let fixture: ComponentFixture<ProjectsAmsRegisterTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsAmsRegisterTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsAmsRegisterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
