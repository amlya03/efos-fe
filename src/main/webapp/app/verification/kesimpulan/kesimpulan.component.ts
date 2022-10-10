import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'jhi-kesimpulan',
  templateUrl: './kesimpulan.component.html',
  styleUrls: ['./kesimpulan.component.scss']
})
export class KesimpulanComponent implements OnInit {
  editor!: Editor;

  constructor() { }

  ngOnInit(): void {
    this.editor = new Editor();
  }

}
