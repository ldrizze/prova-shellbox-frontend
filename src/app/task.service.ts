import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
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

  create(title){
      return this.http.post<string>(
          this.url,
          JSON.stringify({title : title}),
          {
              responseType: 'text',
              headers: {
                  'Content-Type': 'application/json'
              },
          } as any
      );
  }

  update(id, title):Observable<HttpResponse<any>>{
      return this.http.put<any>(
          `${this.url}/${id}`,
          JSON.stringify({title : title}),
          {
              headers: {
                  'Content-Type': 'application/json'
              }
          }
      );
  }

  delete(id){
      return this.http.delete(`${this.url}/${id}`, {
          observe: 'response',
          responseType: 'text'
      });
  }
}
