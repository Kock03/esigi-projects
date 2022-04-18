import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PortalComponent implements OnInit {
  project: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  goBackProjects(){
    this.router.navigate(['projetos/lista'])
  }

  handleProject(number: number): void {
    this.project = number;
    sessionStorage.setItem('project_type', this.project.toString());
    this.router.navigate(['projetos/cadastro']);
  }
}
