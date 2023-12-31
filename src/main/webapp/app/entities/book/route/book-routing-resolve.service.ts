import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBook } from '../book.model';
import { BookService } from '../service/book.service';

@Injectable({ providedIn: 'root' })
export class BookRoutingResolveService implements Resolve<IBook | null> {
  constructor(protected service: BookService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBook | null | never> {
    const id = route.params.id;
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((book: HttpResponse<IBook>) => {
          if (book.body) {
            return of(book.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
