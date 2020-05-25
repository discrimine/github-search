import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, takeLast, startWith, reduce } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { Subscription, BehaviorSubject, combineLatest, OperatorFunction } from 'rxjs';
import { ProjectsResponse, Project } from 'src/app/core/interfaces/project.interface';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public search: FormControl = new FormControl('');
  public projects: BehaviorSubject<Project[]> = new BehaviorSubject([]);
  public currentPage: BehaviorSubject<number> = new BehaviorSubject(1);
  private subscriptions = new Subscription();

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  public changePage(action: string): void {
    switch (action) {
      case 'prev':
        this.currentPage.next(this.currentPage.getValue() - 1)
        break;
      case 'next':
        this.currentPage.next(this.currentPage.getValue() + 1)
        break;
    }
  }

  public addToFavourite(project: Project) {
    const favouriteProjects: Project[] = JSON.parse(localStorage.getItem('favorite')) || [];
    
    if (favouriteProjects.find((el) => el.id === project.id)) {
      this.snackBar.open('Already added', 'X', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'snack-error',
      });
    } else {
      this.snackBar.open('Successfuly added!', 'X', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'snack-success',
      });
      favouriteProjects.push(project);
    }
    
    localStorage.setItem('favorite', JSON.stringify(favouriteProjects))
  }

  private formInit(): void {
    // TODO: use spinner
    this.subscriptions.add(
      combineLatest(
        this.search.valueChanges,
        this.currentPage,
      )
        .pipe(
          debounceTime(1000),
          // TODO: avoid any, investigate how to use FormControl as generic
          switchMap((value: any, page: number) => {
            return this.apiService.getProjects(value, page)
          })
        )
        .subscribe((response: ProjectsResponse) => {
          this.projects.next(response.items);
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.projects.complete();
  }

}
