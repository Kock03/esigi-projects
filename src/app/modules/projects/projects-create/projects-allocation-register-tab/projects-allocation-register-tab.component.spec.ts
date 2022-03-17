import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsRegisterTabComponent } from './projects-allocation-register-tab.component';

describe('ProjectsRegisterTabComponent', () => {
  let component: ProjectsRegisterTabComponent;
  let fixture: ComponentFixture<ProjectsRegisterTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsRegisterTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsRegisterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
