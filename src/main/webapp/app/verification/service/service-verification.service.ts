import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { ApplicationConfigService } from 'app/core/config/application-config.service';

export type EntityArrayResponseDaWa = HttpResponse<ApiResponse>;
@Injectable({
  providedIn: 'root',
})
export class ServiceVerificationService {
  // //////////////////////service daftar aplikasi waiting assign\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected allDataVerif = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-verif/list_app_verif');
  protected listAprisal = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-verif/list_appraisal');
  // //////////////////////service daftar aplikasi waiting assign\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////service daftar aplikasi on process\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected allDataOnProcess = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-verif/list_appraisal_process'
  );
  // //////////////////////service daftar aplikasi on process\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////service daftar aplikasi waiting update status\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected allDataWaitingUpdateStatus = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-verif/list_app_analisa_review'
  );
  // //////////////////////service daftar aplikasi waiting update status\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// REFF \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // ////////////////////// Ref Hubungan Angunan /////////////////////////////
  protected refHubunganAgunan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_hubungan_agunan'
  );
  // ////////////////////// Ref Hubungan Angunan /////////////////////////////

  // ////////////////////// Ref Jabatan /////////////////////////////
  protected refJabatan = this.applicationConfigService.getEndpointFor('http://10.20.34.110:8805/api/v1/efos-ref/list_jabatan');
  // ////////////////////// Ref Jabatan /////////////////////////////

  // ////////////////////// Ref Jumlah Karyawan /////////////////////////////
  protected refJumlahKaryawan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_jumlah_karyawan'
  );
  // ////////////////////// Ref Jumlah Karyawan /////////////////////////////

  // ////////////////////// Ref Hubungan Emergency /////////////////////////////
  protected refHubunganEmergency = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_hubungan_emergency'
  );
  // ////////////////////// Ref Hubungan Emergency /////////////////////////////

  // ////////////////////// Ref Hubungan Emergency /////////////////////////////
  protected refStatusPerkawinan = this.applicationConfigService.getEndpointFor(
    'http://10.20.34.110:8805/api/v1/efos-ref/list_status_perkawinan'
  );
  // ////////////////////// Ref Hubungan Emergency /////////////////////////////
  // ////////////////////// REFF \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  // //////////////////////service daftar aplikasi waiting assign\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // ///////////////////////////contoh post get di angular////////////////////////////////////////////////
  // getDaWa(req?: any): Observable<EntityArrayResponseDaWa> {
  //   const options = createRequestOption(req);
  //   return this.http.get<ApiResponse>(this.allDataVerif, { params: options, observe: 'response' });
  // }
  // ///////////////////////////contoh post get di angular////////////////////////////////////////////////
  getDaWa(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.allDataVerif);
  }

  getDaWaAprisal(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.listAprisal);
  }
  // //////////////////////service daftar aplikasi waiting assign\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////service daftar aplikasi on process\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getDaOp(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.allDataOnProcess);
  }
  // //////////////////////service daftar aplikasi on process\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // //////////////////////service daftar aplikasi waiting update status\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getDaWuS(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.allDataWaitingUpdateStatus);
  }
  // //////////////////////service daftar aplikasi waiting update status\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ///////////////////// REF ////////////////////////////////////////////////
  // ////////////////////// Ref Hubungan Agunan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getHubunganAgunan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refHubunganAgunan);
  }
  // ////////////////////// Ref Hubungan Agunan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Jabatan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getJabatan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refJabatan);
  }
  // ////////////////////// Ref Jabatan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Jumlah Karyawan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getJumlahKaryawan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refJumlahKaryawan);
  }
  // ////////////////////// Ref Jumlah Karyawan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getHubunganEmergency(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refHubunganEmergency);
  }
  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getStatusPerkawinan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.refStatusPerkawinan);
  }
  // ////////////////////// Ref Hubungan Emergency \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // ///////////////////// REF ////////////////////////////////////////////////
}
