import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule }  from '@angular/router';

import { HomeComponent } from './main/home/home.component';
import { FavoritesComponent } from './main/favorites/favorites.component';
import { FavoritesGuard } from './core/guards/favorites.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [FavoritesGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
