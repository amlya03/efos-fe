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
import { EntityArrayResponseDaWa, PersonalInfoComponent } from 'app/data-entry/personal-info/personal-info.component';
import { createRequestOption } from 'app/core/request/request-util';
import { Observable } from 'rxjs';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-de/getDataEntryByDe?sd=');
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
  datakiriman: any;
  datakirimanstatus: any;
  datakirimanakategoripekerjaan: any;
  datakirimanakategoripekerjaanNav: any;
  datakirimanid: any;
  datakirimantgllahir: any;
  datakirimanappide: any;
  datakirimanidcustomer: any;

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
      this.datakiriman = params['datakiriman'];
      this.app_no_de = params['app_no_de'];
      this.datakirimanstatus = params.datakirimanstatus;
      this.datakirimanakategoripekerjaan = params.datakirimanakategoripekerjaan;
      this.datakirimanakategoripekerjaanNav = params.datakirimanakategoripekerjaan;
      if (this.datakirimanakategoripekerjaan === 'Fix Income') {
        this.datakirimanakategoripekerjaan = this.datakirimanakategoripekerjaan.replace(' ', '%20');
      }
      if (this.datakirimanakategoripekerjaan === 'Non Fix Income') {
        this.datakirimanakategoripekerjaan = 'Non%20Fix%20Income';
      }
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {
    // alert(this.datakirimanid)
    // alert(this.datakirimantgllahir)
    // alert(this.datakirimanappide)
    // alert(this.datakiriman);
    // alert(this.app_no_de);
    // alert(this.datakirimanstatus);
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

    // ref personal info
    this.getdataentry().subscribe({
      next: (res: EntityArrayResponseDaWa) => {
        this.daWa = res.body?.result;
      },
    });
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

  // ref personal
  getdataentry(req?: any): Observable<EntityArrayResponseDaWa> {
    const options = createRequestOption(req);
    return this.http.get<ApiResponse>(this.resourceUrl + this.app_no_de, { params: options, observe: 'response' });
  }
}
