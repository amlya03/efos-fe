import { Injectable } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';

@Injectable({ providedIn: 'root' })
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PaginationConfig {
  constructor(config: NgbPaginationConfig) {
    config.boundaryLinks = true;
    config.maxSize = 5;
    config.pageSize = ITEMS_PER_PAGE;
    config.size = 'sm';
  }
}
