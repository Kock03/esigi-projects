import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PortalComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  async navigateToProject() {
    this.router.navigate(['projetos/alocacao']);
  }

  checkProjectTypeAllocation(){
    sessionStorage.setItem('projectType', '1'); 
    console.log (sessionStorage)
  }
  checkProjectTypeAms(){
    sessionStorage.setItem('projectType', '2');
    console.log (sessionStorage)
  }

}
