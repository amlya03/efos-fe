import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'app/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('username', { static: false })
  username!: ElementRef;
  loginCounter = 0;
  counter = 3;

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
    // this.loginCounter += 1;
    //   if (this.loginCounter == 3) {
    //     alert('Sudah Salah Sebanyak 3 Kali')
    //   }
    this.sessionStorageService.store('sessionPs', this.loginForm.get('password')?.value);
    this.loginService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.authenticationError = false;
        if (!this.router.getCurrentNavigation()) {
          Swal.fire({
            title: 'Berhasil Login!',
            imageAlt: 'Custom image',
            showConfirmButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
          // There were no routing during login (eg from navigationToStoredUrl)
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Perhatikan !',
          text: 'User name atau Password salah',
        });

        this.authenticationError = true;
      },
    });
  }
}
