import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import { DaftarAplikasiWaitingAssigmentComponent } from './verification/daftar-aplikasi-waiting-assigment/daftar-aplikasi-waiting-assigment.component';
import { DaftarAplikasiOnProcessComponent } from './verification/daftar-aplikasi-on-process/daftar-aplikasi-on-process.component';
import { DaftarAplikasiWaitingUpdateStatusComponent } from './verification/daftar-aplikasi-waiting-update-status/daftar-aplikasi-waiting-update-status.component';
import { DataCalonNasabahComponent } from './verification/data-calon-nasabah/data-calon-nasabah.component';
import { DataKantorComponent } from './verification/data-kantor/data-kantor.component';
import { DataRumahComponent } from './verification/data-rumah/data-rumah.component';
import { StukturPembiayaanComponent } from './verification/stuktur-pembiayaan/stuktur-pembiayaan.component';
import { MutasiRekeningComponent } from './verification/mutasi-rekening/mutasi-rekening.component';
import { ChecklistDocumentComponent } from './verification/checklist-document/checklist-document.component';
import { SuratPersetujuanComponent } from './verification/surat-persetujuan/surat-persetujuan.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        {
          path: 'daftar-aplikasi-waiting-assigment',
          component: DaftarAplikasiWaitingAssigmentComponent,
        },
        {
          path: 'daftar-aplikasi-on-process',
          component: DaftarAplikasiOnProcessComponent,
        },
        {
          path: 'daftar-aplikasi-waiting-update-status',
          component: DaftarAplikasiWaitingUpdateStatusComponent,
        },
        {
          path: 'data-calon-nasabah',
          component: DataCalonNasabahComponent,
        },
        {
          path: 'data-kantor',
          component: DataKantorComponent,
        },
        {
          path: 'data-rumah',
          component: DataRumahComponent,
        },
        {
          path: 'mutasi-rekening',
          component: MutasiRekeningComponent,
        },
        {
          path: 'sturktur-pembiayaan',
          component: StukturPembiayaanComponent,
        },
        {
          path: 'checklist-document',
          component: ChecklistDocumentComponent,
        },
        {
          path: 'surat-persetujuan',
          component: SuratPersetujuanComponent,
        },
        {
          path: '',
          loadChildren: () => import(`./entities/entity-routing.module`).then(m => m.EntityRoutingModule),
        },
        navbarRoute,
        ...errorRoute,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
