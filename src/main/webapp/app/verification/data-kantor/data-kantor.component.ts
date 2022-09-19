import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'jhi-data-kantor',
  templateUrl: './data-kantor.component.html',
  styleUrls: ['./data-kantor.component.scss'],
})
export class DataKantorComponent implements OnInit {
  editor!: Editor;
  html = '';

  // constructor() { }

  ngOnInit(): void {
    this.editor = new Editor();
  }
}
