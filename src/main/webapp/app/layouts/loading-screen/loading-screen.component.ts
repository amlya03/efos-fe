import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent implements OnInit {
  @Input() public isLoading: boolean | null = false;
  @Input() isSpin: boolean | null = true;

  constructor() {}

  ngOnInit(): void {}
}
