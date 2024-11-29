import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {

  private sidebarVisible: boolean = false;
  username: string | null = null;
  usernameInitials: string | null = null;
  configuration$ = this.oidcSecurityService.getConfiguration();

  userData$ = this.oidcSecurityService.userData$;

  isAuthenticated = false;

  constructor(private readonly oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.loadUserName();
        } else {  
          this.username = null;
          this.usernameInitials = null;
        }
        console.warn('authenticated: ', isAuthenticated);
      }
    );
    console.log(this.userData$);
  }

  sidebarToggle() {
    const body = document.getElementsByTagName('body')[0];

    if (!this.sidebarVisible) {
      body.classList.add('nav-open');
      this.sidebarVisible = true;
      console.log('making sidebar visible...');
    } else {
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }

  private loadUserName(): void {
    this.oidcSecurityService.userData$.subscribe(({userData}) => {
      console.log('UserData:', userData);

      // Check if userData contains the username claim (adjust claim key if needed)
      this.username = userData?.username || userData?.preferred_username || null;
      if (this.username)
        this.usernameInitials = this.getInitials(this.username);
    });
  }
  
  login(): void {
    //this._userName = 'Max';
    this.oidcSecurityService.authorize();
    //this.userName = this.userData$['username'];
    
  }

  logout(): void {
    //this._userName = '';
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    const clientId = environment.CLIENT_ID;
    const domain = environment.DOMAIN;
    window.location.href = `${domain}/logout?client_id=${clientId}&logout_uri=${window.location.origin}/logout`; 
  }

  private getInitials(name: string): string {
    return name
      .split(' ') 
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }
}
