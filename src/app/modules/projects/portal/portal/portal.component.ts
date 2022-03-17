import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  async navigateToAllocationProject() {
    this.router.navigate(['/projetos']);
  }

  async navigateToAms() {
  }

}
