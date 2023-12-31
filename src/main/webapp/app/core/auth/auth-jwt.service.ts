import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { ApplicationConfigService } from '../config/application-config.service';
import { Login } from 'app/login/login.model';
import { environment } from 'environments/environment';

class JwtToken {
  code?: number;
  message?: string;
  result?: any;
  token?: string;
  fullname: any;
  groupname?: string;
  kd_cabang?: number;
  username?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  baseUrl: string = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private applicationConfigService: ApplicationConfigService
  ) {}

  getToken(): string {
    const tokenInLocalStorage: string | null = this.localStorageService.retrieve('authenticationToken');
    const tokenInSessionStorage: string | null = this.sessionStorageService.retrieve('authenticationToken');
    return tokenInLocalStorage ?? tokenInSessionStorage ?? '';
  }

  login(credentials: Login): Observable<void> {
    return (
      this.http
        // .post<JwtToken>(this.applicationConfigService.getEndpointFor('api/authenticate'), credentials)
        .post<any>(this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos/users/login'), credentials)
        // .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
        .pipe(map(response => this.authenticateSuccess(response)))
    );
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.sessionStorageService.clear('authenticationToken');
      // //////role//////////////
      this.sessionStorageService.clear('sessionRole');
      // /////username///////////
      this.sessionStorageService.clear('sessionUserName');
      // //////fullname/////////
      this.sessionStorageService.clear('sessionFullName');
      // /////kodebarang//////////
      this.sessionStorageService.clear('sessionKdCabang');
      // //////Sudah Logout////////
      this.sessionStorageService.clear('SudahLogin');

      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken): void {
    const jwt = response.result?.token;
    const sessionRole = response.result?.groupname;
    const sessionUserName = response.result?.username;
    const sessionFullName = response.result?.fullname;
    const sessionKdCabang = response.result?.kd_cabang;
    this.sessionStorageService.store('SudahLogin', 1);
    this.sessionStorageService.store('sessionKdCabang', sessionKdCabang);
    this.sessionStorageService.store('sessionFullName', sessionFullName);
    this.sessionStorageService.store('sessionUserName', sessionUserName);
    this.sessionStorageService.store('sessionRole', sessionRole);
    this.sessionStorageService.store('authenticationToken', jwt);
  }
}
