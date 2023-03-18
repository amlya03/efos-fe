/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Component, Input, OnInit } from '@angular/core';
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
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { environment } from 'environments/environment';
import { modelCustomer } from 'app/initial-data-entry/services/config/modelCustomer.model';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
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
  dataEntry: fetchAllDe = new fetchAllDe();
  curef: string | undefined;
  datakirimanakategoripekerjaan: any;
  datakirimanakategoripekerjaanNav: any;
  datakirimanid: any;
  datakirimantgllahir: any;
  datakirimanappide: any;
  datakirimanidcustomer: any;
  paramId: any;
  kategori: any;
  kode_fasilitas: any;
  fasilitas: any;
  navbarParameterize: navbarModel[] = [];
  childNavbar: navbarModel[] = [];
  statusPerkawinan: any;
  modelIde: modelCustomer = new modelCustomer();

  constructor(
    protected http: HttpClient,
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    public router: Router,
    private route: ActivatedRoute,
    protected applicationConfigService: ApplicationConfigService,
    protected verificationServices: ServiceVerificationService,
    protected dataEntryServices: DataEntryService
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
      this.kode_fasilitas = params.kode_fasilitas;
      this.fasilitas = params.fasilitas;
      // ///////////////// Data Entry //////////////////////////////////
      this.curef = params.curef;
      this.app_no_de = params.app_no_de;
      this.datakirimanakategoripekerjaan = params.datakirimanakategoripekerjaan;
      this.datakirimanakategoripekerjaanNav = params.datakirimanakategoripekerjaan;
      this.datakirimanid = params.datakirimanid;
      this.datakirimantgllahir = params.datakirimantgllahir;
      this.datakirimanappide = params.datakirimanappide;
    });
    // ////////////////////buat tangkap param\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  }

  ngOnInit(): void {
    this.getLoading(true);
    this.entitiesNavbarItems = EntityNavbarItems;
    // this.profileService.getProfileInfo().subscribe(profileInfo => {
    //   this.inProduction = profileInfo.inProduction;
    //   this.openAPIEnabled = profileInfo.openAPIEnabled;
    // });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });

    this.untukSessionRole = this.sessionStorageService.retrieve('sessionRole');
    this.untukSessionUserName = this.sessionStorageService.retrieve('sessionUserName');
    this.untukSessionFullName = this.sessionStorageService.retrieve('sessionFullName');
    this.untukSessionKodeCabang = this.sessionStorageService.retrieve('sessionKdCabang');
    this.sudahLogin = this.sessionStorageService.retrieve('SudahLogin');

    if (this.sudahLogin === null) {
      this.router.navigate(['/login']);
      this.getLoading(false);
    } else {
      this.verificationServices.postNavbar(this.sessionStorageService.retrieve('sessionRole')).subscribe({
        next: data => {
          this.navbarParameterize = data.result;
          this.childNavbar = data.result[0].child;
        },
      });

      this.dataEntryServices.getFetchSemuaDataDE(this.app_no_de).subscribe(de => {
        this.dataEntry = de.result;
        if (de.result == null) {
          this.statusPerkawinan = 'BELUM KAWIN';
          this.getLoading(false);
        } else {
          this.statusPerkawinan = this.dataEntry.status_perkawinan;
          this.getLoading(false);
        }
        this.dataEntryServices.getCustomerByCuref(this.dataEntry.curef).subscribe(customer => {
          this.modelIde = customer.result;
        });
      });
    }

    // ADMINISTRATOR //
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
      showDenyButton: true,
      confirmButtonText: 'Logout',
      denyButtonText: ' Ganti password',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#8567d3',
      cancelButtonColor: '#999999',
      reverseButtons: true,
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Berhasil Logout!', '', 'warning').then(() => {
          this.loginService.logout();
          this.router.navigate(['/login']);
          window.location.reload();
        });
      } else if (result.isDenied) {
        $(document).ready(function () {
          $('#togglePassword').click(function () {
            const paswd = $('#password_lama');
            if (paswd.attr('type') == 'password') {
              document.getElementById('password_lama')?.setAttribute('type', 'text');
              $('#togglePassword').attr('src', '../../../content/images/show.png');
            } else {
              document.getElementById('password_lama')?.setAttribute('type', 'password');
              $('#togglePassword').attr('src', '../../../content/images/hide.png');
            }
          });
          $('#togglePassword2').click(function () {
            const paswd = $('#passwor_baru');
            if (paswd.attr('type') == 'password') {
              document.getElementById('passwor_baru')?.setAttribute('type', 'text');
              $('#togglePassword2').attr('src', '../../../content/images/show.png');
            } else {
              document.getElementById('passwor_baru')?.setAttribute('type', 'password');
              $('#togglePassword2').attr('src', '../../../content/images/hide.png');
            }
          });
          $('#togglePassword3').click(function () {
            const paswd = $('#Confirm_password');
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
            const passwordlama = $('#password_lama').val();
            const passwordbaru = $('#passwor_baru').val();
            const confrimpassword = $('#Confirm_password').val();
            if (passwordlama === '') {
              Swal.fire('Gagal Menyimpan Password Lama Belum diisi');
              return;
            } else if (passwordbaru === '') {
              Swal.fire('Gagal Menyimpan Password Baru Belum diisi');
              return;
            } else if (confrimpassword === '') {
              Swal.fire('Gagal Menyimpan confirm  password belum di isi');
              return;
            } else if (confrimpassword != passwordbaru) {
              Swal.fire('Confirm atau Password Baru Tidak Sama');
              return;
            } else if (passwordlama != this.sessionStorageService.retrieve('sessionPs')) {
              Swal.fire('Password lama salah');
              return;
            } else if (passwordlama == passwordbaru) {
              Swal.fire('Password Baru sama dengan Password Lama ');
              return;
            } else {
              const body = {
                username: this.sessionStorageService.retrieve('sessionUserName'),
                old_password: passwordlama,
                new_password: passwordbaru,
              };
              const headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${this.sessionStorageService.retrieve('authenticationToken')}`,
              });
              this.http.post<any>(this.baseUrl + 'v1/efos/users/resetPassword', body, { headers }).subscribe({
                next: () => {
                  // console.warn(response);
                  this.sessionStorageService.store('sessionPs', passwordbaru);
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen(toast) {
                      toast.addEventListener('mouseenter', Swal.stopTimer);
                      toast.addEventListener('mouseleave', Swal.resumeTimer);
                    },
                  });
                  Toast.fire({
                    icon: 'success',
                    title: 'Change Password Berhasil',
                  });
                },
                error() {
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen(toast) {
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
          }
        });
      }
    });
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }
}
