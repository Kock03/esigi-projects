import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAmsPanelTabComponent } from './projects-ams-panel-tab.component';

describe('ProjectsAmsPanelTabComponent', () => {
  let component: ProjectsAmsPanelTabComponent;
  let fixture: ComponentFixture<ProjectsAmsPanelTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsAmsPanelTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsAmsPanelTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
