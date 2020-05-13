import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Comment, Post, upsertEntities } from 'shared';

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

  posts$ = this.state$.pipe(map(s => s.posts));
  comments$ = this.state$.pipe(map(s => s.comments));

  constructor(private http: HttpClient) {

  }

  fetchPosts() {
    this.httpGetPosts()
      .subscribe(posts => {
        console.log('upsert:', upsertEntities(this.state$.getValue().posts, posts, 'id'));
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

  httpPostComment(item: Pick<Comment, 'text' | 'postId'>): Observable<Comment[]> {
    return this.http.post<Comment[]>(this.commentUrl, item);
  }

  httpPostPost(post: Pick<Post, 'title'>): Observable<Post[]> {
    return this.http.post<Post[]>(this.postUrl, post);
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
      .subscribe(comments => {
        this.state$.next({
          ...this.state$.getValue(),
          comments: upsertEntities(this.state$.getValue().comments, comments, 'id')
        });
      });
  }

  httpGetComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentUrl).pipe(
      catchError(() => of([] as Comment[]))
    );
  }
}
