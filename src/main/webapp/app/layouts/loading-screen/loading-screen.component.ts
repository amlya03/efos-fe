import { Component, Input } from '@angular/core';

@Component({
  selector: 'jhi-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = true;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    //
  }
}
