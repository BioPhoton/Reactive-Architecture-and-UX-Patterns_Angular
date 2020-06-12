import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Post} from 'shared';

interface BlogServiceState {
  postsSearchResult: Post[];
}

@Injectable({
  providedIn: 'root'
})
export class MergeAllBlogService {

  private readonly baseUrl = 'api';
  private readonly postUrl = [this.baseUrl, 'post'].join('/');

  private readonly state$ = new BehaviorSubject<BlogServiceState>({
    postsSearchResult: [] as Post[]
  });

  constructor(private http: HttpClient) {

  }

  searchPosts(searchString: string): Observable<Post[]> {
    return this.httpGetPosts({title: searchString});
  }

  httpGetPosts(params?: HttpParams | {
    [param: string]: string | string[];
  }): Observable<Post[]> {
    console.log('httpGetPosts')
    return this.http.get<Post[]>(this.postUrl, {params}).pipe(
      tap(v => console.log('result', v)),
      catchError(() => of([] as Post[]))
    );
  }

}

