import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAllocationCreateComponent } from './projects-allocation-create.component';

describe('ProjectsAllocationCreateComponent', () => {
  let component: ProjectsAllocationCreateComponent;
  let fixture: ComponentFixture<ProjectsAllocationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsAllocationCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsAllocationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
