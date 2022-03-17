import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPanelTabComponent } from './projects-allocation-panel-tab.component';

describe('ProjectsPanelTabComponent', () => {
  let component: ProjectsPanelTabComponent;
  let fixture: ComponentFixture<ProjectsPanelTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsPanelTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsPanelTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
