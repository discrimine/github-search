import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SharedModule } from '../shared/shared.module';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    HomeComponent,
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ApiService,
  ]
})
export class MainModule { }
