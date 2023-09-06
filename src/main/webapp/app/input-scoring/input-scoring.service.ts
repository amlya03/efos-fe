/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { environment } from 'environments/environment';
import { parameterrac } from './parameterrac.model';
import { BeanParameterRac } from './beanParameterrac.model';

@Injectable({
  providedIn: 'root'
})
export class InputScoringService {
  baseUrl: string = environment.baseUrl;

  // ////////////////////// get Sub Parameter Scoring BY Id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected getParameterScoringUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/getParameterScoring?si=');
  // ////////////////////// get Sub Parameter Scoring BY Id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // /////////////////////////// List Segmentasi ////////////////////////////////////////////
  protected listSegmentasiUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_segmentasi');
  // /////////////////////////// List Segmentasi ////////////////////////////////////////////

  // /////////////////////////// List Tipe Kepegawaian ////////////////////////////////////////////
  protected listTipeKepegawaianUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_RefTipeKepegawaian');
  // /////////////////////////// List Tipe Kepegawaian ////////////////////////////////////////////

  // /////////////////////////// List scoring ////////////////////////////////////////////
  protected listScoring = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_data_scoring');
  // /////////////////////////// List scoring ////////////////////////////////////////////

  // /////////////////////////// Reff scoring ////////////////////////////////////////////
  protected scoring = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_parameter_scoring');
  // /////////////////////////// Reff scoring ////////////////////////////////////////////

  // /////////////////////////// Reff mainparameterscoring////////////////////////////////////////////
  protected mainparameterscoring = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_main_parameter_scoring');
  // /////////////////////////// Reff mainparameterscoring ////////////////////////////////////////////

  // /////////////////////////// Reff parameterscoring////////////////////////////////////////////
  protected parameterscoring = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_parameter_scoring');
  // /////////////////////////// Reff parameterscoring ////////////////////////////////////////////

  // /////////////////////////// Reff parameterrac////////////////////////////////////////////
  protected parameterrac = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_parameter_rac');
  // /////////////////////////// Reff parameterscoring ////////////////////////////////////////////

  // /////////////////////////// Reff create parameterrac////////////////////////////////////////////
  protected createparameterrac = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/create_parameter_rac');
  // /////////////////////////// Reff create parameterrac ////////////////////////////////////////////

  // /////////////////////////// Reff kategori pekerjaan////////////////////////////////////////////
  protected kategoripekerjaan = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_RefKategoriPekerjaan');
  // /////////////////////////// Reff kategori pekerjaan ////////////////////////////////////////////

  // /////////////////////////// Reff getmainparamterscoringbyid////////////////////////////////////////////
  protected reffgetmainparamterscoringbyid = this.applicationConfigService.getEndpointFor(
    this.baseUrl + 'v1/efos-ref/getMainParameterScoring?si='
  );
  // /////////////////////////// Reff getmainparamterscoringbyid ////////////////////////////////////////////

  // /////////////////////////// Reff deleteracbyid////////////////////////////////////////////
  protected reffdeleteracbyid = this.applicationConfigService.getEndpointFor(this.baseUrl + '/v1/efos-ref/delete_RefRAC?id=');
  // /////////////////////////// Reff deleteracbyid ////////////////////////////////////////////

  // /////////////////////////// Reff getdatascoringbyid////////////////////////////////////////////
  protected reffgetdatascoringbyid = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/getDataScoring?si=');
  // /////////////////////////// Reff getdatascoringbyid ////////////////////////////////////////////

  // /////////////////////////// Reff getparameterracbyid////////////////////////////////////////////
  protected reffgetparameterracbyid = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/getrac?id=');
  // /////////////////////////// Reff getparameterracbyid ////////////////////////////////////////////

  // /////////////////////////// Reff List Akad ////////////////////////////////////////////
  protected listAkadUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_akad');
  // /////////////////////////// Reff List Akad ////////////////////////////////////////////

  // /////////////////////////// Reff list Ftv Scoring ////////////////////////////////////////////
  protected listFtvScoringUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_ftv_scoring');
  // /////////////////////////// Reff list Ftv Scoring ////////////////////////////////////////////

  // /////////////////////////// Get Ftv Scoring ////////////////////////////////////////////
  protected listFtvDpDetail = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_ftv_dp_detail?ss=');
  // /////////////////////////// Get Ftv Scoring ////////////////////////////////////////////

  // /////////////////////////// Get Ftv Scoring ////////////////////////////////////////////
  protected getFtvScoringUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/getFtvScoring?si=');
  // /////////////////////////// Get Ftv Scoring ////////////////////////////////////////////

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  // /////////////////////////// Reff List Akad ////////////////////////////////////////////
  getListAkad(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.listAkadUrl);
  }
  // /////////////////////////// Reff List Akad ////////////////////////////////////////////

  // ////////////////////// Ref scoring \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getScoring(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.scoring);
  }
  // ////////////////////// Ref scoring \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// List segmentasi \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  listSegmentasi(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.listSegmentasiUrl);
  }
  // ////////////////////// List segmentasi \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// List segmentasi \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  listTipeKepegawaian(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.listTipeKepegawaianUrl);
  }
  // ////////////////////// List segmentasi \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// List scoring \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  listDataScoring(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.listScoring);
  }
  // ////////////////////// List scoring \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// get mainparameterscoring \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  listmainparameterscoring(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.mainparameterscoring);
  }
  // ////////////////////// List mainparameterscoring \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// get listparameterscoring \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  listparameterscoring(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.parameterscoring);
  }
  // ////////////////////// List listparameterscoring \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// get listparameterrac \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  listparameterrac(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.parameterrac);
  }
  // ////////////////////// List listparameterrac \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// get createlistparameterrac \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  createlistparameterrac(model: parameterrac): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.createparameterrac, model);
  }
  // ////////////////////// List createlistparameterrac \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// get kategori pekerjaan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  listkategoripekerjaan(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.kategoripekerjaan);
  }
  // ////////////////////// get kategori pekerjaan \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// get listparameterscoring \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getmainparameterscoringbyid(id: string | null | undefined): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.reffgetmainparamterscoringbyid + id);
  }
  // ////////////////////// List getdatascoringdetail \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// get listparameterscoring \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getdatascoringdetailbyid(id: string | null | undefined): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.reffgetdatascoringbyid + id);
  }
  // ////////////////////// List getdatascoringdetail\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// get deleteracbyid \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getdeleterac(id: string | null | undefined): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.reffdeleteracbyid + id);
  }
  // ////////////////////// List getdatascoringdetail\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// get Sub Parameter Scoring BY Id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getParameterScoring(id: string | null | undefined): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getParameterScoringUrl + id);
  }
  // ////////////////////// get Sub Parameter Scoring BY Id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // ////////////////////// get Sub Parameter Rac BY Id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getParameterRac(id: string | number | null | undefined): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.reffgetparameterracbyid + id);
  }
  // ////////////////////// get Sub Parameter Rac BY Id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  // /////////////////////////// Reff list Ftv Scoring ////////////////////////////////////////////
  listFtvScoring(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.listFtvScoringUrl);
  }
  // /////////////////////////// Reff list Ftv Scoring ////////////////////////////////////////////

  // /////////////////////////// Get Ftv Scoring ////////////////////////////////////////////
  getListFtvDpDetail(id: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.listFtvDpDetail + id);
  }

  getFtvScoring(id: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getFtvScoringUrl + id);
  }
  // /////////////////////////// Get Ftv Scoring ////////////////////////////////////////////

  public saveRac(beanRac: BeanParameterRac): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.parameterrac, beanRac);
  }
}
