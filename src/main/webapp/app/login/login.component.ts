import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'app/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('username', { static: false })
  username!: ElementRef;

  authenticationError = false;

  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    // rememberMe: new FormControl(false, { nonNullable: true, validators: [Validators.required] }),
    app: new FormControl('efo', { nonNullable: true }),
  });

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    protected http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    // if already authenticated then navigate to home page
    // this.accountService.identity().subscribe(() => {
    //   if (this.accountService.isAuthenticated()) {
    //     this.router.navigate(['']);
    //   }
    // });
  }

  ngAfterViewInit(): void {
    this.username.nativeElement.focus();
  }

  login(): void {
    // this.loginService.login(this.loginForm.getRawValue()).subscribe({
    //   next: () => {
    //     this.authenticationError = false;
    //     if (!this.router.getCurrentNavigation()) {
    //       // There were no routing during login (eg from navigationToStoredUrl)
    //       this.router.navigate(['/']);
    //     }
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 300);
    //   },
    //   error: () => (this.authenticationError = true),
    // });

    this.http
      // .post<any>('http://10.20.81.186:8096/token/generate-token', {
      .post<any>('http://10.20.34.110:8096/token/generate-token', {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
        app: 'efo',
      })
      .subscribe({
        next: response => {
          const sessionRole = response.result?.groupname;
          const sessionUserName = response.result?.username;
          const sessionFullName = response.result?.fullname;
          const sessionKdCabang = response.result?.kd_cabang;
          this.sessionStorageService.store('SudahLogin', 1);
          this.sessionStorageService.store('sessionKdCabang', sessionKdCabang);
          this.sessionStorageService.store('sessionFullName', sessionFullName);
          this.sessionStorageService.store('sessionUserName', sessionUserName);
          this.sessionStorageService.store('sessionRole', sessionRole);
          this.router.navigate(['/']);
          setTimeout(() => {
            window.location.reload();
          }, 100);
        },
        error: err => {
          alert('Userid dan Password Tidak Ada');
        },
      });
  }
}
