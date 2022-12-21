import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from 'src/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'esigi-projects';
  activeMenu!: '';
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  token!: string;
  openTree: boolean = false;
  compare!: any;

  projects: string = 'projetos';
  home: string = 'portal';

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    public translateService: TranslateService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log(this.sidenav);
    this.translateService.setDefaultLang('pt-BR');
    this.translateService.use('pt-BR');
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((res: any) => {
        let valid = res.url.indexOf('validate');
        if (valid === -1) {
          this.token = localStorage.getItem('token')!;
          if (!this.token) {
            location.replace(environment.portal);
          }
        }
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

  recize() {
    this.openTree = this.openTree === true ? false : true;
  }

  navigate(route: string) {
    this.router.navigate([route]);
    sessionStorage.clear();
  }

  navigator(route: any) {
    switch (route) {
      case 'projetos':
        location.replace(`https://aws-amplify.d2rvrb6snp0n9a.amplifyapp.com/validate/${this.token}`)
        break;
        case 'portal':
          location.replace(`https://aws-amplify.d3tee2p1a2jxch.amplifyapp.com/validate/${this.token}`);
        break;
    }
  }

  openApp(): void {
    this.token = localStorage.getItem('token')!;
    location.replace(environment.port + `3406/validate/${this.token}`);
  }

  logout(): void {
    this.userService.logout();
  }
}
