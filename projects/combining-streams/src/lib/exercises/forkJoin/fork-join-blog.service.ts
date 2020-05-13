import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Comment, Post} from 'shared';


@Injectable({
  providedIn: 'root'
})
export class ForkJoinBlogService {
  private baseUrl = 'api';
  private commentUrl = [this.baseUrl, 'comment'].join('/');
  private postUrl = [this.baseUrl, 'post'].join('/');

  constructor(private http: HttpClient) {

  }

  httpGetComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentUrl).pipe(
      catchError(e => of([] as Comment[]))
    );
  }

  httpGetPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl).pipe(
      catchError(e => of([] as Post[]))
    );
  }

  httpPostComment(item: Pick<Comment, 'text' | 'postId'>): Observable<Comment[]> {
    return this.http.post<Comment[]>(this.commentUrl, item);
  }

  httpPostPost(post: Pick<Post, 'title'>): Observable<Post[]> {
    return this.http.post<Post[]>(this.postUrl, post);
  }

}

