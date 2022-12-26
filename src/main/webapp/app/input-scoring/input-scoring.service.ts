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
  // /////////////////////////// List scoring ////////////////////////////////////////////
  protected listScoring = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_data_scoring');
  // /////////////////////////// List scoring ////////////////////////////////////////////

  // /////////////////////////// Reff scoring ////////////////////////////////////////////
  protected scoring = this.applicationConfigService.getEndpointFor(this.baseUrl + 'v1/efos-ref/list_parameter_scoring');
  // /////////////////////////// Reff scoring ////////////////////////////////////////////

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

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
}
