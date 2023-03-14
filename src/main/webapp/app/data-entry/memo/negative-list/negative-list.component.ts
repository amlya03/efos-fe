import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { DataEntryService } from 'app/data-entry/services/data-entry.service';
import { modelJobIde } from 'app/initial-data-entry/services/config/modelJobIde.model';
import { fetchAllDe } from 'app/upload-document/services/config/fetchAllDe.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'jhi-negative-list',
  templateUrl: './negative-list.component.html',
  styleUrls: ['./negative-list.component.scss'],
})
export class NegativeListComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = false;
  negativeForm!: FormGroup;
  baseUrl: string = environment.baseUrl;
  dataEntryModel: fetchAllDe = new fetchAllDe();
  jobModel: modelJobIde = new modelJobIde();
  curef: string | undefined;
  app_no_de: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private formBuilder: FormBuilder,
    protected dataEntryService: DataEntryService
  ) {
    this.route.queryParams.subscribe(params => {
      this.curef = params.curef;
    });

    this.route.queryParams.subscribe(params => {
      this.app_no_de = params.app_no_de;
    });
  }

  ngOnInit(): void {
    this.getLoading(true);

    this.negativeForm = this.formBuilder.group({
      checkPekerjaan: '',
      checkJenisInstansi: '',
      checkBidangUsaha: '',
    });
    this.load();
  }

  updatedBm(): void {
    this.router.navigate(['/negative-list'], {
      queryParams: { app_no_de: this.app_no_de },
    });
  }

  load(): void {
    this.dataEntryService.getFetchSemuaDataDE(this.app_no_de).subscribe({
      next: data => {
        this.dataEntryModel = data.result;
        console.warn(this.dataEntryModel);

        this.dataEntryService.getFetchSemuaDataJob(this.dataEntryModel.curef).subscribe({
          next: job => {
            this.jobModel = job.result.shift();
            console.warn(this.jobModel);
            this.getLoading(false);
          },
          error: () => {
            this.getLoading(false);
          },
        });
      },
      error: () => {
        this.getLoading(false);
      },
    });
  }

  public getLoading(loading: boolean): void {
    this.isLoading = loading;
    this.isSpin = loading;
  }

  checkPekerjaan(event: any): void {
    console.warn(event);
  }
}
