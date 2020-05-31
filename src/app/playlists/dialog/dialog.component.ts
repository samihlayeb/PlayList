import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
interface Playlist {
  name: string;
  totalDuration: number;
  totalSongs: number;
  description: string;
  songs: Song[];
}
interface Song {
  title: string;
  artist: string;
  duration: number;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  dataPlayList: Playlist;
  formPlayList: FormGroup;
  /******* Injecting data {function (create / edit ), Playlists already existing, cursor position when editing a playlist  }
   * MAT_DIALOG_DATA is necessary to access data in dialog  **********/
  constructor(public dialogWindow: MatDialogRef<DialogComponent>, private fBuilder: FormBuilder ,
              @Inject(MAT_DIALOG_DATA) public data: {function: string, dataPlayList: Playlist, position: number}) { }

  ngOnInit() {
    this.initForm();
    if (this.data.function === 'edit') {
      this.data.dataPlayList.songs.forEach((song, index) => {
        if (index > 0) {
          this.addSong();
        }
      });
      this.formPlayList.patchValue(this.data.dataPlayList);
    }
  }
  /**** Initiating playlist Form in dialog **/
  initForm() {
    this.formPlayList = this.fBuilder.group({
      name: ['', Validators.required],
      totalDuration: [0],
      description: ['', Validators.required],
      songs: this.fBuilder.array([this.initSongs()])
    });
  }
  /**** Extract songs  from playlist as a FormArray  *****/
  get songs() {
    return this.formPlayList.get('songs') as FormArray;
  }
  /**** Initiating songs Form in dialog **/
  initSongs() {
    return this.fBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      duration: [null, [Validators.required, Validators.min(0)]]
    });
  }
  addSong() {
    this.songs.push(this.initSongs());
  }

  removeSong(index: number) {
    this.songs.removeAt(index);
  }
  onCancel() {
    this.dialogWindow.close();
  }
  onSubmit() {
    let duration = 0;
    this.dataPlayList = this.formPlayList.value;
    this.dataPlayList.songs.forEach(song => duration += song.duration);
    this.dataPlayList.totalDuration = duration;
    this.dataPlayList.totalSongs = this.dataPlayList.songs.length;

    this.dialogWindow.close({
      data: this.dataPlayList,
      index: this.data.position
    });
  }
}
