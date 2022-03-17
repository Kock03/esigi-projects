import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAmsCreateComponent } from './projects-ams-create.component';

describe('ProjectsAmsCreateComponent', () => {
  let component: ProjectsAmsCreateComponent;
  let fixture: ComponentFixture<ProjectsAmsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsAmsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsAmsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
