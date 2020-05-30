import {NgModule} from '@angular/core';
import {PlaylistsComponent} from './playlists.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PlaylistsRoutes} from './playlists.routes';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatDividerModule,
  MatExpansionModule, MatFormFieldModule, MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [PlaylistsComponent],
  imports: [CommonModule, RouterModule.forChild(PlaylistsRoutes),
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatIconModule],
  providers: []
})

export class PlaylistsModule {}
