import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Project } from 'src/app/core/interfaces/project.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent implements OnInit, OnDestroy {

  @Input() projects: BehaviorSubject<Project[]>;
  @Input() mode: 'home' | 'favorites';
  @Output() action = new EventEmitter<Project>();

  @ViewChild(MatPaginator) 
  set paginator(value: MatPaginator) {
    this.gridOptions.paginator = value;
  }

  public gridOptions: MatTableDataSource<Project> = new MatTableDataSource([]);
  public displayedColumns = ['avatar', 'name', 'rating', 'description', 'link', 'lang', 'add'];
  public filterOptions: Set<string> = new Set();
  private subscriptions: Subscription = new Subscription();

  constructor() { }
  
  ngOnInit(): void {
    this.subscriptions.add(this.projects.subscribe((projects: Project[]) => {
      this.gridOptions.data = projects;
      
      projects.forEach((project: Project): void => {
        if (project.language) {
          this.filterOptions.add(project.language);
        }
      });
    }));

    this.gridOptions.filterPredicate = (data: Project, filter: string): boolean => {
      return filter === 'all' || data.language === filter;
    };
  }

  public onAction(project: Project) {
    this.action.emit(project);
  }

  public applyFilter(event) {
    this.gridOptions.filter = event.value;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
