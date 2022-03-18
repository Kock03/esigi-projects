import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAllocationPanelTabComponent } from './projects-allocation-panel-tab.component';

describe('ProjectsAllocationPanelTabComponent', () => {
  let component: ProjectsAllocationPanelTabComponent;
  let fixture: ComponentFixture<ProjectsAllocationPanelTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsAllocationPanelTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsAllocationPanelTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
