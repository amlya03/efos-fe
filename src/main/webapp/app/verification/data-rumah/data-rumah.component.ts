import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'jhi-data-rumah',
  templateUrl: './data-rumah.component.html',
  styleUrls: ['./data-rumah.component.scss'],
})
export class DataRumahComponent implements OnInit {
  editor!: Editor;
  html = '';
  dataRumahForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.editor = new Editor();

    // ////////// Validasi \\\\\\\\\\\\\\\\\
    this.dataRumahForm = this.formBuilder.group({
      tanggal_verification: ['', Validators.required],
      no_customer: ['', [Validators.required, Validators.minLength(12)]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.dataRumahForm.invalid) {
      return;
    }
    alert('Coba Validasi');
  }
}
