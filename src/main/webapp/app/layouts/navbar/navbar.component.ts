import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];
  element = false;
  navVerif = false;
  navHome = true;
  navDe = false;
  navIde = false;
  untukSessionRole: any;
  untukSessionUserName: any;
  untukSessionFullName: any;
  untukSessionKodeCabang: any;

  constructor(
    private localStorageService: LocalStorageService,
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
    this.route.params.subscribe(params => console.warn('parameternya ', params));
  }

  ngOnInit(): void {
    this.entitiesNavbarItems = EntityNavbarItems;
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });

    this.untukSessionRole = this.localStorageService.retrieve('sessionRole');
    this.untukSessionUserName = this.localStorageService.retrieve('sessionUserName');
    this.untukSessionFullName = this.localStorageService.retrieve('sessionFullName');
    this.untukSessionKodeCabang = this.localStorageService.retrieve('sessionKdCabang');
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  showData(): void {
    this.element = true;
    this.navHome = false;
    this.navDe = true;
    this.navVerif = true;
    if (
      this.router.url === '/daftaraplikasiide'
      //   // this.router.url === '/data-entry/personalinfo',
      //   // this.router.url === '/data-entry/job-info',
      //   // this.router.url === '/data-entry/data-pasangan',
      //   // this.router.url === '/data-entry/pekerjaan-pasangan',
      //   // this.router.url === '/data-entry/collateral',
      //   // this.router.url === '/data-entry/struktur-pembiayaan',
      //   // this.router.url === '/data-entry/emergency-contact',
      //   // this.router.url === '/data-entry/duplicate-checking',
      //   // this.router.url === '/data-entry/scoring',
      //   // this.router.url === '/data-entry/call-report',
      //   // this.router.url === '/data-entry/call-report-non',
      //   // this.router.url === '/data-entry/memo'
    ) {
      this.element = true;
      this.navHome = false;
      this.navIde = true;
      this.navDe = false;
      this.navVerif = true;
    }
    // if(
    //   this.router.url === '/data-entry'
    //   // this.router.url === '/data-entry/personalinfo',
    //   // this.router.url === '/data-entry/job-info',
    //   // this.router.url === '/data-entry/data-pasangan',
    //   // this.router.url === '/data-entry/pekerjaan-pasangan',
    //   // this.router.url === '/data-entry/collateral',
    //   // this.router.url === '/data-entry/struktur-pembiayaan',
    //   // this.router.url === '/data-entry/emergency-contact',
    //   // this.router.url === '/data-entry/duplicate-checking',
    //   // this.router.url === '/data-entry/scoring',
    //   // this.router.url === '/data-entry/call-report',
    //   // this.router.url === '/data-entry/call-report-non',
    //   // this.router.url === '/data-entry/memo'
    //   ){
    //     this.element=true;
    //     this.navDe = true;
    //     this.navIde = false;
    //   }
  }
  hideData(): void {
    this.element = false;
    this.navHome = true;
    this.navVerif = false;
    this.navIde = false;
    this.navDe = false;
  }
}
