import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Post} from 'shared';

interface BlogServiceState {
  postsSearchResult: Post[];
}

@Injectable({
  providedIn: 'root'
})
export class SwitchMapBlogService {

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
    return this.http.get<Post[]>(this.postUrl, {params}).pipe(
      catchError(() => of([] as Post[]))
    );
  }

}

