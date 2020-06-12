import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Post} from 'shared';

interface BlogServiceState {
  posts: Post[];
}

@Injectable({
  providedIn: 'root'
})
export class MergeMapBlogService {

  private readonly baseUrl = 'api';
  private readonly postUrl = [this.baseUrl, 'post'].join('/');

  private readonly state$ = new BehaviorSubject<BlogServiceState>({
    posts: [] as Post[],
  });

  readonly posts$ = this.state$.pipe(map(s => s.posts));

  constructor(private http: HttpClient) {
    this.fetchPosts();
  }

  fetchPosts() {
    this.httpGetPosts()
      .subscribe(posts => {
        this.state$.next({
          ...this.state$.getValue(),
          posts
        });
      });
  }

  httpGetPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl).pipe(
      catchError(() => of([] as Post[]))
    );
  }

  httpDeletePosts(params: {
    id: number;
  }): Observable<Post[]> {
    return this.http.delete<Post[]>([this.postUrl, params.id].join('/')).pipe(
      catchError(() => of([] as Post[]))
    );
  }

}

