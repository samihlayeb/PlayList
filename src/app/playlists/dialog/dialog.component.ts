import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  formPlayList: FormGroup;
  constructor(public dialogWindow: MatDialogRef<DialogComponent>, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formPlayList = this.fb.group({
      name: ['', Validators.required],
      totalDuration: [0],
      description: ['', Validators.required],
      songs: this.fb.array([this.initSongs()])
    });
  }
  initSongs() {
    return this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      duration: [null, [Validators.required, Validators.min(0)]]
    });
  }
  get songs() {
    return this.formPlayList.get('songs') as FormArray;
  }

  onCancel() {
    this.dialogWindow.close();
  }
  onSubmit() {
    this.dialogWindow.close();
  }
}
