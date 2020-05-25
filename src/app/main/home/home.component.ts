import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ProjectsResponse, Project } from 'src/app/core/interfaces/project.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public search: FormControl = new FormControl('');
  public projects: BehaviorSubject<Project[]> = new BehaviorSubject([]);
  private subscriptions = new Subscription();

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.formInit();
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
      this.search.valueChanges
        .pipe(
          debounceTime(1000),
          // TODO: avoid any, investigate how to use FormControl as generic
          switchMap((value: any) => {
            return this.apiService.getProjects(value)
          })
        )
        .subscribe(
          (response: ProjectsResponse) => {
            this.projects.next(response.items);
          },
          (error) => {
            console.error(error);
          }
        )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.projects.complete();
  }

}
