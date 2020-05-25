import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from 'src/app/core/interfaces/project.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  public favoriteProjects: BehaviorSubject<Project[]> = new BehaviorSubject([]);

  constructor() { }

  ngOnInit(): void {
    this.initProjects();
  }

  public initProjects() {
    const favoriteProjects = JSON.parse(localStorage.getItem('favorite')) || [];
    this.favoriteProjects.next(favoriteProjects);
  }

  public removeFromFavourite(project: Project): void {
    let favoriteProjects = JSON.parse(localStorage.getItem('favorite')) || [];
    favoriteProjects = favoriteProjects.filter((favoriteProject: Project) => favoriteProject.id !== project.id)

    this.favoriteProjects.next(favoriteProjects);
    localStorage.setItem('favorite', JSON.stringify(favoriteProjects));
  }

  ngOnDestroy(): void {
    this.favoriteProjects.complete();
  }

}
