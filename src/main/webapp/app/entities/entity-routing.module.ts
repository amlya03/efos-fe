import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'book',
        data: { pageTitle: 'newEfosApp.book.home.title' },
        loadChildren: () => import('./book/book.module').then(m => m.BookModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class EntityRoutingModule {}
