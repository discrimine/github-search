import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FavoritesGuard implements CanActivate {

  constructor(private snackBar: MatSnackBar) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const password = prompt('Please, enter your password');
      let isValid = false;

      if (password === '1234') {
        this.snackBar.open('Logged', 'X', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'snack-success',
        });

        isValid = true;
      } else {
        this.snackBar.open('Invalid password', 'X', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'snack-error',
        });

        isValid = false;
      }

      return isValid;
      
  }
  
}
