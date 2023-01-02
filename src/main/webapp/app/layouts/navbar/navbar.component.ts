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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ServiceVerificationService } from 'app/verification/service/service-verification.service';
import { navbarModel } from './navbarModel.model';
import { createRequestOption } from 'app/core/request/request-util';

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
  paramId: any;
  kategori: any;
  navbarParameterize: navbarModel[] = [];
  childNavbar: navbarModel[] = [];

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
    protected applicationConfigService: ApplicationConfigService,
    protected verificationServices: ServiceVerificationService
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
      this.paramId = params.id;
      this.kategori = params.kategori;
      // ///////////////// Data Entry //////////////////////////////////
      this.curef = params['curef'];
      this.app_no_de = params['app_no_de'];
      this.statusPerkawinan = params.statusPerkawinan;
      this.datakirimanakategoripekerjaan = params.datakirimanakategoripekerjaan;
      this.datakirimanakategoripekerjaanNav = params.datakirimanakategoripekerjaan;
      this.datakirimanid = params.datakirimanid;
      this.datakirimantgllahir = params.datakirimantgllahir;
      this.datakirimanappide = params.datakirimanappide;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {
    this.verificationServices.postNavbar(this.SessionStorageService.retrieve('sessionRole')).subscribe({
      next: data => {
        this.navbarParameterize = data.result;
        this.childNavbar = data.result.child;
      },
    });

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
        '</p><p>Saya adalah   ' +
        this.untukSessionRole +
        '</p>',
      imageUrl: '../../../content/images/bank-mega-syariah.png',
      imageWidth: 100,
      imageHeight: 70,
      imageAlt: 'Eagle Image',
      showCancelButton: true,
      // showDenyButton: true,
      confirmButtonText: 'Logout',
      // denyButtonText: ' Ganti password',
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
      } else if (result.isDenied) {
        $(document).ready(function () {
          $('#togglePassword').click(function () {
            let paswd = $('#password_lama');
            if (paswd.attr('type') == 'password') {
              document.getElementById('password_lama')?.setAttribute('type', 'text');
              $('#togglePassword').attr('src', '../../../content/images/show.png');
            } else {
              document.getElementById('password_lama')?.setAttribute('type', 'password');
              $('#togglePassword').attr('src', '../../../content/images/hide.png');
            }
          });
          $('#togglePassword2').click(function () {
            let paswd = $('#passwor_baru');
            if (paswd.attr('type') == 'password') {
              document.getElementById('passwor_baru')?.setAttribute('type', 'text');
              $('#togglePassword2').attr('src', '../../../content/images/show.png');
            } else {
              document.getElementById('passwor_baru')?.setAttribute('type', 'password');
              $('#togglePassword2').attr('src', '../../../content/images/hide.png');
            }
          });
          $('#togglePassword3').click(function () {
            let paswd = $('#Confirm_password');
            if (paswd.attr('type') == 'password') {
              document.getElementById('Confirm_password')?.setAttribute('type', 'text');
              $('#togglePassword3').attr('src', '../../../content/images/show.png');
            } else {
              document.getElementById('Confirm_password')?.setAttribute('type', 'password');
              $('#togglePassword3').attr('src', '../../../content/images/hide.png');
            }
          });
        });

        Swal.fire({
          title: 'Change Password',
          html:
            '<div class="form-lable row " id="dataValueDiv1"><label class="col-sm-3 col-form-label">Password lama</label>' +
            '<div class="col-sm-9"><input  type="password" class="form-control2" id="password_lama"/> <img src="../../../content/images/hide.png" width="20px" height="20px" style="margin-left: -11%;display:inline;vertical-align: middle" id="togglePassword">' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Password baru</label>' +
            '<div class="col-sm-9"><input type="password" class="form-control2" id="passwor_baru"/> <img src="../../../content/images/hide.png" width="20px" height="20px" style="margin-left: -11%;display:inline;vertical-align: middle" id="togglePassword2">' +
            '</div></div>' +
            '<div class="form-lable row" id="dataValueDiv"><label class="col-sm-3 col-form-label">Confirm password</label>' +
            '<div class="col-sm-9"><input type="password" class="form-control2" id="Confirm_password"/>  <img src="../../../content/images/hide.png" width="20px" height="20px" style="margin-left: -11%;display:inline;vertical-align: middle" id="togglePassword3">' +
            '</div></div>',
          allowOutsideClick: false,
          showDenyButton: true,
          focusConfirm: false,
        }).then(result => {
          if (result.isConfirmed) {
            let passwordlama = $('#password_lama').val();
            let passwordbaru = $('#passwor_baru').val();
            let confrimpassword = $('#Confirm_password').val();
            if (passwordlama === '') {
              // alert('Gagal Menyimpan password lama belum di isi');
              Swal.fire('Gagal Menyimpan password lama belum di isi');
              return;
            } else if (passwordbaru === '') {
              // alert('Gagal Menyimpan password baru belum di isi');
              Swal.fire('Gagal Menyimpan password baru belum di isi');
              return;
            } else if (confrimpassword === '') {
              // alert('Gagal Menyimpan confirm  password belum di isi');
              Swal.fire('Gagal Menyimpan confirm  password belum di isi');
              return;
            } else if (confrimpassword != passwordbaru) {
              // alert('confirm atau password baru tidak sama');
              Swal.fire('confirm atau password baru tidak sama');
              return;
            } else if (passwordlama != this.SessionStorageService.retrieve('sessionPs')) {
              // alert('confirm atau password baru tidak sama');
              Swal.fire('Password lama salah');
              return;
            } else if (passwordlama == passwordbaru) {
              // alert('confirm atau password baru tidak sama');
              Swal.fire('Password baru sama dengan Password lama ');
              return;
            } else {
              const body = {
                username: this.SessionStorageService.retrieve('sessionUserName'),
                old_password: passwordlama,
                new_password: passwordbaru,
              };
              let headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${this.SessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>('http://10.20.34.110:8096/users/resetPassword', body, { headers }).subscribe({
                next: response => {
                  //console.warn(response);
                  this.sessionStorageService.store('sessionPs', passwordbaru);
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: toast => {
                      toast.addEventListener('mouseenter', Swal.stopTimer);
                      toast.addEventListener('mouseleave', Swal.resumeTimer);
                    },
                  });
                  Toast.fire({
                    icon: 'success',
                    title: 'Change Password Berhasil',
                  });
                },
                error: error => {
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: toast => {
                      toast.addEventListener('mouseenter', Swal.stopTimer);
                      toast.addEventListener('mouseleave', Swal.resumeTimer);
                    },
                  });
                  Toast.fire({
                    icon: 'error',
                    title: 'Change Password Gagal',
                  });
                },
              });
            }
          } else if (result.isDenied) {
          }
        });
      }
    });
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
