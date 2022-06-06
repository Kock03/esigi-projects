import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'esigi-projects';
  activeMenu!: '';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  menuList = [
    {
      name: 'project_sidenav.projects',
      icon: 'analytics',
      selected: false,
      action: 'projetos/lista',
    },
  ];

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt-BR');
    this.translateService.use('pt-BR');
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((res: any) => {
        this.activeMenu = res.url.split('/')[1];
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 800px)']).subscribe((res: any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    }, 50);
  }

  navigate(route: string) {
    this.router.navigate([route]);
    sessionStorage.clear();
  }
}
