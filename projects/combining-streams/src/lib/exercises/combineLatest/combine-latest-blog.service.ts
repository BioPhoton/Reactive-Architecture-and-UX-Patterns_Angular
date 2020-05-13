import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Comment, Post, upsertEntities} from 'shared';

interface BlogServiceState {
  posts: Post[];
  comments: Comment[];
}

@Injectable({
  providedIn: 'root'
})
export class CombineLatestBlogService {

  private readonly baseUrl = 'api';
  private readonly commentUrl = [this.baseUrl, 'comment'].join('/');
  private readonly postUrl = [this.baseUrl, 'post'].join('/');

  private readonly state$ = new BehaviorSubject<BlogServiceState>({
    posts: [] as Post[],
    comments: [] as Comment[]
  });

  readonly posts$ = this.state$.pipe(map(s => s.posts));
  readonly comments$ = this.state$.pipe(map(s => s.comments));

  constructor(private http: HttpClient) {
    this.fetchPosts();
    this.fetchComments();
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

  fetchComments() {
    this.httpGetComments()
      .subscribe(comments => {
        this.state$.next({
          ...this.state$.getValue(),
          comments: upsertEntities(this.state$.getValue().comments, comments, 'id')
        });
      });
  }

  addPost(post: Pick<Post, 'title'>) {
    this.httpPostPost(post)
      .subscribe((newPost) => {
        console.log('saved ', newPost , 'to the server');
        this.state$.next({
          ...this.state$.getValue(),
          posts: upsertEntities(this.state$.getValue().posts, [newPost], 'id')
        })
      }, console.log);
  }

  httpGetPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl).pipe(
      catchError(() => of([] as Post[]))
    );
  }

  httpPostComment(item: Pick<Comment, 'text' | 'postId'>): Observable<Comment[]> {
    return this.http.post<Comment[]>(this.commentUrl, item);
  }

  httpPostPost(post: Pick<Post, 'title'>): Observable<Post> {
    return this.http.post<Post>(this.postUrl, post);
  }

  httpGetComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentUrl).pipe(
      catchError(() => of([] as Comment[]))
    );
  }
}

