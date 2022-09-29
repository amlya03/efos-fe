import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-editjobinfo',
  templateUrl: './editjobinfo.component.html',
  styleUrls: ['./editjobinfo.component.scss'],
})
export class EditjobinfoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.load();
  }
  load() {
    throw new Error('Method not implemented.');
  }
}
