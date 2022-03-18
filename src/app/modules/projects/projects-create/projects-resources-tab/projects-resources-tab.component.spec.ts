import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsResourcesTabComponent } from './projects-resources-tab.component';

describe('ProjectsResourcesTabComponent', () => {
  let component: ProjectsResourcesTabComponent;
  let fixture: ComponentFixture<ProjectsResourcesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsResourcesTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsResourcesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
