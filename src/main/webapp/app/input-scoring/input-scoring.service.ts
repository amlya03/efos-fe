import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'app/entities/book/ApiResponse';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InputScoringService {
  baseUrl: string = environment.baseUrl;

  // ////////////////////// get Sub Parameter Scoring BY Id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  protected getParameterScoringUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/getParameterScoring?si=');
  // ////////////////////// get Sub Parameter Scoring BY Id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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

  // /////////////////////////// Reff getmainparamterscoringbyid////////////////////////////////////////////
  protected reffgetmainparamterscoringbyid = this.applicationConfigService.getEndpointFor(
    this.baseUrl + 'v1/efos-ref/getMainParameterScoring?si='
  );
  // /////////////////////////// Reff getmainparamterscoringbyid ////////////////////////////////////////////

  // /////////////////////////// Reff getdatascoringbyid////////////////////////////////////////////
  protected reffgetdatascoringbyid = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/getDataScoring?si=');
  // /////////////////////////// Reff getdatascoringbyid ////////////////////////////////////////////

  // /////////////////////////// Reff List Akad ////////////////////////////////////////////
  protected listAkadUrl = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_akad');
  // /////////////////////////// Reff List Akad ////////////////////////////////////////////

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

  // ////////////////////// get Sub Parameter Scoring BY Id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  getParameterScoring(id: string | null | undefined): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.getParameterScoringUrl + id);
  }
  // ////////////////////// get Sub Parameter Scoring BY Id \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
}
