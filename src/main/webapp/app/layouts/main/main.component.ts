import { Component, OnInit, RendererFactory2, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import dayjs from 'dayjs/esm';

import { AccountService } from 'app/core/auth/account.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import { LoginService } from 'app/login/login.service';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  private renderer: Renderer2;
  baseUrl: string = environment.baseUrl;
  baseUrlDukcapil: string = environment.baseUrlDukcapil;

  constructor(
    private accountService: AccountService,
    private titleService: Title,
    private router: Router,
    private translateService: TranslateService,
    rootRenderer: RendererFactory2,
    protected de: DataEntryService,
    private loginService: LoginService
  ) {
    this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);
  }

  ngOnInit(): void {
    // try to log in automatically
    // this.accountService.identity().subscribe();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
      }
    });

    this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.updateTitle();
      dayjs.locale(langChangeEvent.lang);
      this.renderer.setAttribute(document.querySelector('html'), 'lang', langChangeEvent.lang);
    });
    // //////////////// Check Server /////////////////////////
    let interval = setInterval(() => {
      this.de.getFetchStatusPerkawinan().subscribe({
        next: () => {},
        error: () => {
          clearInterval(interval);
          this.loginService.logout();
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Jaringan Terputus',
            showConfirmButton: false,
          }).then(() => {
            window.location.reload();
            // this.router.navigate(['/login']).then(() => {
            //   window.location.reload();
            // });
          });
        },
      });
    }, 6 * 1000);
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    const title: string = routeSnapshot.data['pageTitle'] ?? '';
    if (routeSnapshot.firstChild) {
      return this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  private updateTitle(): void {
    let pageTitle = this.getPageTitle(this.router.routerState.snapshot.root);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }
    this.translateService.get(pageTitle).subscribe(title => this.titleService.setTitle(title));
  }
}
