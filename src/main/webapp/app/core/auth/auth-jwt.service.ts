import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { ApplicationConfigService } from '../config/application-config.service';
import { Login } from 'app/login/login.model';

type JwtToken = {
  id_token: string;
};

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
        .post<JwtToken>(this.applicationConfigService.getEndpointFor('http://10.20.81.186:8096/token/generate-token'), credentials)
        // .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
        .pipe(map(response => this.authenticateSuccess(response)))
    );
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.localStorageService.clear('authenticationToken');
      this.sessionStorageService.clear('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken): void {
    const jwt = response.id_token;
    // if (rememberMe) {
    this.localStorageService.store('authenticationToken', jwt);
    this.sessionStorageService.clear('authenticationToken');
    // } else {
    //   this.sessionStorageService.store('authenticationToken', jwt);
    //   this.localStorageService.clear('authenticationToken');
    // }
  }
}
