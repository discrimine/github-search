import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { GITHUB_API } from 'src/app/core/constants/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  public getProjects(title: string, page: number = 1) {
    const params = new HttpParams({
      fromObject: {
        q: title,
        page: page.toString(),
        language: 'php'
      }
    });
    return this.http.get(GITHUB_API, {params});
  }
}
