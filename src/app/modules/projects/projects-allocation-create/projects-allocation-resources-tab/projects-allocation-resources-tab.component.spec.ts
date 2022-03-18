import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAllocationResourcesTabComponent } from './projects-allocation-resources-tab.component';

describe('ProjectsAllocationResourcesTabComponent', () => {
  let component: ProjectsAllocationResourcesTabComponent;
  let fixture: ComponentFixture<ProjectsAllocationResourcesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsAllocationResourcesTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsAllocationResourcesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
