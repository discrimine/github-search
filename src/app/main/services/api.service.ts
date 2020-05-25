import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GITHUB_API } from 'src/app/core/constants/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  public getProjects(title: string) {
    const params = new HttpParams({
      fromObject: {
        q: title,
      }
    });
    return this.http.get(GITHUB_API, {params});
  }
}
