import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    public url:string = "http://localhost:8080/tasks"

  constructor(private http:HttpClient) { }

  list(page:number=1):Observable<HttpResponse<any>>{
      return this.http.get<any>(this.url, {
          params: new HttpParams().set('page', page.toString()),
          observe: 'response'
      });
  }
}