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
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { EntityArrayResponseDaWa } from 'app/data-entry/personal-info/personal-info.component';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];
  untukSessionRole: any;
  untukSessionUserName: any;
  untukSessionFullName: any;
  untukSessionKodeCabang: any;
  role: any;
  navbarPersonalInfo: any;
  app_no_de: any;
  daWa: any;
  curef: any;
  statusPerkawinan: any;
  datakirimanakategoripekerjaan: any;
  datakirimanakategoripekerjaanNav: any;
  datakirimanid: any;
  datakirimantgllahir: any;
  datakirimanappide: any;
  datakirimanidcustomer: any;

  // get isLoggedIn() {
  //   return this.loggedIn.asObservable(); // {2}
  // }

  constructor(
    protected http: HttpClient,
    private localStorageService: LocalStorageService,
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    public router: Router,
    private route: ActivatedRoute,
    protected applicationConfigService: ApplicationConfigService
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    this.route.queryParams.subscribe(params => {
      // ///////////////////////////Initial Data Entry/////////////////////////////
      this.datakirimanid = params.datakirimanid;
      this.datakirimantgllahir = params.datakirimantgllahir;
      this.datakirimanappide = params.datakirimanappide;
      this.datakirimanidcustomer = params.datakirimanidcustomer;

      // ///////////////// Data Entry //////////////////////////////////
      this.curef = params['curef'];
      this.app_no_de = params['app_no_de'];
      this.statusPerkawinan = params.statusPerkawinan;
      this.datakirimanakategoripekerjaan = params.datakirimanakategoripekerjaan;
      this.datakirimanakategoripekerjaanNav = params.datakirimanakategoripekerjaan;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {
    // alert(this.curef)
    // alert(this.datakirimanid)
    // alert(this.datakirimantgllahir)
    // alert(this.datakirimanappide)
    // alert(this.datakiriman);
    // alert(this.app_no_de);
    // alert(this.statusPerkawinan);
    // alert(this.datakirimanidcustomer);
    // const personal_info_retrive = (<HTMLInputElement>document.getElementById("personal_info")).value;
    // alert((<HTMLInputElement>document.getElementById("personal_info")).value)
    // this.navbarPersonalInfo = personal_info_retrive
    // ////////////////////////////////////////
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
    // this.router.navigate(['/login']);
      // this.loggedIn.next(true);
      this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
    // this.router.navigate(['/login']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
