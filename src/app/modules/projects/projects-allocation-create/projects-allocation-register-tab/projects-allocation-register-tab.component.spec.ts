import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAllocationRegisterTabComponent } from './projects-allocation-register-tab.component';

describe('ProjectsAllocationRegisterTabComponent', () => {
  let component: ProjectsAllocationRegisterTabComponent;
  let fixture: ComponentFixture<ProjectsAllocationRegisterTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsAllocationRegisterTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsAllocationRegisterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
