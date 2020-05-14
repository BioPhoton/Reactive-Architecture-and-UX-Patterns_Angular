import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { upsertEntities } from 'shared/lib/list-resource/operations/list-operations';
import { Post, Comment } from 'shared/lib/list-resource/models';

interface BlogBasicServiceState {
  posts: Post[];
  comments: Comment[];
}

@Injectable({
  providedIn: 'root'
})
export class BlogBasicService {

  private readonly baseUrl = 'api';
  private readonly commentUrl = [this.baseUrl, 'comment'].join('/');
  private readonly postUrl = [this.baseUrl, 'post'].join('/');

  private readonly state$ = new BehaviorSubject<BlogBasicServiceState>({
    posts: [] as Post[],
    comments: [] as Comment[]
  });

  readonly posts$ = this.state$.pipe(map(s => s.posts));
  readonly comments$ = this.state$.pipe(map(s => s.comments));

  constructor(private http: HttpClient) {

  }

  fetchPosts() {
    this.httpGetPosts()
      .subscribe(posts => {
       this.state$.next({
          ...this.state$.getValue(),
          posts: upsertEntities(this.state$.getValue().posts, posts, 'id')
        });
      });
  }

  httpGetPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl).pipe(
      catchError(() => of([] as Post[]))
    );
  }

  httpPostComment(item: Pick<Comment, 'text' | 'postId'>): Observable<Comment> {
    return this.http.post<Comment>(this.commentUrl, item);
  }

  httpPostPost(post: Pick<Post, 'title'>): Observable<Post> {
    return this.http.post<Post>(this.postUrl, post);
  }

  addPost(post: Pick<Post, 'title'>) {
    this.httpPostPost(post)
      .subscribe((v) => {
        console.log(v);
        this.fetchPosts();
      }, console.log);
  }

  addComment(item: Pick<Comment, 'text' | 'postId'>) {
    this.httpPostComment(item)
      .subscribe((v) => {
        console.log(v);
        this.fetchComments();
      }, console.log);
  }

  fetchComments() {
    this.httpGetComments()
      .subscribe(comment => {
        this.state$.next({
          ...this.state$.getValue(),
          comments: upsertEntities(this.state$.getValue().comments, [comment], 'id')
        });
      });
  }

  httpGetComments(): Observable<Comment> {
    return this.http.get<Comment>(this.commentUrl).pipe(
      catchError(() => of({} as Comment))
    );
  }
}
