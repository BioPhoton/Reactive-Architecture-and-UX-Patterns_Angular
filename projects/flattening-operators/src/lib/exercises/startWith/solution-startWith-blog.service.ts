import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  endWith,
  map,
  share,
  startWith,
  switchMap,
  switchMapTo,
  tap
} from 'rxjs/operators';
import {Post} from 'shared';

interface BlogServiceState {
  postsSearchResult: Post[];
  searchPending: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StartWithBlogService {

  private readonly baseUrl = 'api';
  private readonly postUrl = [this.baseUrl, 'post'].join('/');

  private readonly searchTrigger$ = new Subject<any>();
  private readonly state$ = new BehaviorSubject<BlogServiceState>({
    postsSearchResult: [] as Post[],
    searchPending: false
  });
  searchPending$ = this.state$.pipe(map(s => s.searchPending), distinctUntilChanged(), share())
  postsSearchResult$ = this.state$.pipe(map(s => s.postsSearchResult), distinctUntilChanged(), share())

  constructor(private http: HttpClient) {

    this.searchTrigger$.pipe(
      switchMap(query => this.httpGetPosts(query).pipe(
        map(res => ({postsSearchResult: res})),
        startWith({searchPending: true}),
        endWith({searchPending: false})
      ))
    ).subscribe(
      stateSlice => this.state$.next({...this.state$.getValue(), ...stateSlice})
    );
  }

  searchPosts(searchString: string): void {
    this.searchTrigger$.next({title: searchString})
  }

  httpGetPosts(params?: {
    [param: string]: string;
  }): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl, {params}).pipe(
      catchError(() => of([] as Post[])),
    );
  }

}

