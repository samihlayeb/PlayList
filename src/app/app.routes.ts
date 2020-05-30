import { Routes } from '@angular/router';


export const AppRoutes: Routes = [
  {
    path: 'playlists',
    loadChildren: './playlists/playlists.module#PlaylistsModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'playlists'
  },
  {
    path: '**',
    redirectTo: 'playlists'
  }
];
