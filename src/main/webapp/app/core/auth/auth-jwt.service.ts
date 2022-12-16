import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { ApplicationConfigService } from '../config/application-config.service';
import { Login } from 'app/login/login.model';

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
        .post<any>(this.applicationConfigService.getEndpointFor('http://10.20.81.186:8096/token/generate-token'), credentials)
        // .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
        .pipe(map(response => this.authenticateSuccess(response)))
    );
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.localStorageService.clear('authenticationToken');
      this.sessionStorageService.clear('authenticationToken');
      // //////role//////////////
      this.localStorageService.clear('sessionRole');
      this.sessionStorageService.clear('sessionRole');
      // /////username///////////
      this.localStorageService.clear('sessionUserName');
      this.sessionStorageService.clear('sessionUserName');
      // //////fullname/////////
      this.localStorageService.clear('sessionFullName');
      this.sessionStorageService.clear('sessionFullName');
      // /////kodebarang//////////
      this.localStorageService.clear('sessionKdCabang');
      this.sessionStorageService.clear('sessionKdCabang');
      // //////Sudah Logout////////
      this.localStorageService.clear('SudahLogin');
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
    // console.warn('ttttoookkkkeeeennnn',response)
    // console.warn('ttttoookkkkeeeennnn22',response.result?.groupname)
    //console.warn('token ', jwt);
    //console.warn('role ', sessionRole);
    //console.warn('username ', sessionUserName);
    //console.warn('full name ', sessionFullName);
    //console.warn('kode cabang ', sessionKdCabang);
    // if (rememberMe) {
    // this.localStorageService.store('sessionRole', sessionRole);
    // this.localStorageService.store('sessionUserName', sessionUserName);
    // this.localStorageService.store('sessionFullName', sessionFullName);
    // this.localStorageService.store('sessionKdCabang', sessionKdCabang);
    // this.localStorageService.store('authenticationToken', jwt);
    // Store Login
    this.sessionStorageService.store('SudahLogin', 1);
    this.sessionStorageService.store('sessionKdCabang', sessionKdCabang);
    this.sessionStorageService.store('sessionFullName', sessionFullName);
    this.sessionStorageService.store('sessionUserName', sessionUserName);
    this.sessionStorageService.store('sessionRole', sessionRole);
    this.sessionStorageService.store('authenticationToken', jwt);

    // this.sessionStorageService.clear('sessionRole');
    // this.sessionStorageService.clear('sessionUserName');
    // this.sessionStorageService.clear('sessionFullName');
    // this.sessionStorageService.clear('sessionKdCabang');
    // this.sessionStorageService.clear('SudahLogin');
    // } else {
    //   this.sessionStorageService.store('authenticationToken', jwt);
    //   this.localStorageService.clear('authenticationToken');
    // }
  }
}
