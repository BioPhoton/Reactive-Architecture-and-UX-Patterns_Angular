import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comment, Post } from 'shared';


@Injectable({
  providedIn: 'root'
})
export class ForkJoinListService {
  private baseUrl = 'api';
  private itemUrl = [this.baseUrl, 'item'].join('/');
  private listUrl = [this.baseUrl, 'list'].join('/');

  constructor(private http: HttpClient) {

  }

  httpGetItems(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.itemUrl).pipe(
      catchError(e => of([] as Comment[]))
    );
  }

  httpGetLists(): Observable<Post[]> {
    return this.http.get<Post[]>(this.listUrl).pipe(
      catchError(e => of([] as Post[]))
    );
  }

}

