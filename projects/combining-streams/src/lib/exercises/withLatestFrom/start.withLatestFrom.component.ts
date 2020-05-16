import { Component } from '@angular/core';
import { BlogService } from './blog.service';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { BlogPost, toBlogPosts } from 'shared';

@Component({
  selector: 'with-latest-from',
  template: `
    <h1>withLatestFrom</h1>

    <mat-form-field>
      <label>Name</label>
      <input matInput name="post" [(ngModel)]="post"/>
    </mat-form-field>
    <button mat-raised-button color="primary" (click)="addPost()">Add Post</button>

    <button mat-raised-button color="accent"
            (click)="optInListClick$.next($event)">
      New posts: ({{(
      numNewItems$ | async
    )}})
    </button>

    <div *ngIf="blog$ | async as blog">
      <mat-list>
        <mat-list-item *ngFor="let post of blog">
          <span mat-line>{{post.title}}</span>
          <span mat-line>Comments: {{post.commentCount}}</span>
        </mat-list-item>
      </mat-list>
    </div>
  `
})
export class StartWithLatestFromComponent {

  post = 'my new post';
  optInListClick$ = new Subject();
  numNewItems$: Observable<number>;
  feed$: Observable<BlogPost[]>; // use optInListClick$ and blog$ to calculate new feed$

  blog$ = combineLatest([
    this.blogService.posts$.pipe(filter(l => !!l.length)),
    this.blogService.comments$.pipe(filter(l => !!l.length))
  ]).pipe(
    map(([posts, comments]) => toBlogPosts(posts, comments)),
    shareReplay(1)
  );

  constructor(public blogService: BlogService) {
    this.blogService.fetchPosts();
    this.blogService.fetchComments();
  }

  addPost() {
    this.blogService.addPost({ title: this.post });
  }
}
