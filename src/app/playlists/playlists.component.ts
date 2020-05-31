import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from './dialog/dialog.component';
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
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [
    {
      name: 'Kopikustik',
      totalDuration: 5,
      totalSongs: 2,
      description: 'More than a coffee, this is all of your favorite accoustic songs.',
      songs: [
        {
          title: 'Cigarettes of ours',
          artist: 'Ardhito Pramono',
          duration: 3
        },
        {
          title: 'Walking Back Home',
          artist: 'Vira Talisa',
          duration: 2
        },
      ]
    },
    {
      name: 'Anime Hits',
      totalDuration: 13,
      totalSongs: 3,
      description: 'Listen to your favorite Anime songs, all in one playlist.',
      songs: [
        {
          title: 'Renai Circulation',
          artist: 'Kana Hanazawa',
          duration: 4
        },
        {
          title: 'Platinum Disco',
          artist: 'Tsukihi Phoenix',
          duration: 4
        },
        {
          title: 'Silhouette',
          artist: 'KANA-BOON',
          duration: 5
        },
      ]
    }
  ];

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  addPlaylist() {
    const dialogWindow = this.dialog.open(DialogComponent, {
      width: '800px',
      data: {
        function: 'create'
      }
    });
    dialogWindow.afterClosed().subscribe(result => {
      if (result.data) {
        this.playlists.push(result.data);
      }
    });
  }
  deletePlaylist(i: number) {
    this.playlists.splice(i, 1);
  }

  editPlaylist(playlist: Playlist, index: number) {
    const dialogWindow = this.dialog.open(DialogComponent, {
      width: '800px',
      data: {
        function: 'edit',
        dataPlayList: playlist,
        position: index
      }
    });
    dialogWindow.afterClosed().subscribe((result: {data: Playlist, index: number}) => {
      if (result.data) {
        this.playlists[result.index] = result.data;
      }
    });
  }
}
