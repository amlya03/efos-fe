import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  sudahLogin = true;
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;
  entitiesNavbarItems: any[] = [];
  untukSessionRole: string | undefined;
  untukSessionUserName: string | undefined;
  untukSessionFullName: string | undefined;
  untukSessionKodeCabang: string | undefined;
  role: string | undefined;
  navbarPersonalInfo: string | undefined;
  app_no_de: string | undefined;
  daWa: any;
  curef: string | undefined;
  statusPerkawinan: string | undefined;
  datakirimanakategoripekerjaan: any;
  datakirimanakategoripekerjaanNav: any;
  datakirimanid: any;
  datakirimantgllahir: any;
  datakirimanappide: any;
  datakirimanidcustomer: any;

  constructor(
    protected http: HttpClient,
    private SessionStorageService: SessionStorageService,
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
    this.entitiesNavbarItems = EntityNavbarItems;
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });

    this.untukSessionRole = this.SessionStorageService.retrieve('sessionRole');
    this.untukSessionUserName = this.SessionStorageService.retrieve('sessionUserName');
    this.untukSessionFullName = this.SessionStorageService.retrieve('sessionFullName');
    this.untukSessionKodeCabang = this.SessionStorageService.retrieve('sessionKdCabang');
    this.sudahLogin = this.SessionStorageService.retrieve('SudahLogin');
    if (this.sudahLogin === null) {
      this.router.navigate(['/login']);
    }
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
    Swal.fire({
      title: 'Informasi Akun',
      html:
        'User Id : ' +
        this.untukSessionUserName +
        ' <p>Nama : ' +
        this.untukSessionFullName +
        '</p><p>Saya adalah ' +
        this.untukSessionRole +
        '</p>',
      imageUrl: '../../../content/images/bank-mega-syariah.png',
      imageWidth: 100,
      imageHeight: 70,
      imageAlt: 'Eagle Image',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#8567d3',
      cancelButtonColor: '#999999',
      reverseButtons: true,
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Berhasil Logout!', '', 'warning').then((message: any) => {
          this.loginService.logout();
          this.router.navigate(['/login']);
          window.location.reload();
        });
      }
    });
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
