import {Component} from '@angular/core';
import {combineLatest, concat, Observable, Subject} from 'rxjs';
import {filter, map, shareReplay, take, withLatestFrom} from 'rxjs/operators';
import { BlogBasicService, BlogPost, toBlogPosts } from 'shared';

@Component({
  selector: 'solution-opt-in-updates-basic',
  template: `
    <h1>(Solution) with-latest-from</h1>

    <mat-form-field>
      <label>Name</label>
      <input matInput name="post" [(ngModel)]="post"/>
    </mat-form-field>
    <button mat-raised-button color="primary" (click)="addPost()">Add Post</button>

    <ng-container *ngIf="(numNewItems$ | async) as numItems">
      <button mat-raised-button color="accent"
              [disabled]="numItems === 0"
              (click)="optInListClick$.next($event)">
        New posts: ({{(
        numItems
      )}})
      </button>
    </ng-container>

    <div *ngIf="feed$ | async as blog">
      <mat-list>
        <mat-list-item *ngFor="let post of blog">
          <span mat-line>{{post.title}}</span>
          <span mat-line>Comments: {{post.commentCount}}</span>
        </mat-list-item>
      </mat-list>
    </div>
  `
})
export class SolutionWithLatestFromComponent {

  post = 'my new post';
  optInListClick$ = new Subject();

  blog$ = combineLatest([
    this.blogService.posts$.pipe(filter(l => !!l.length)),
    this.blogService.comments$.pipe(filter(l => !!l.length))
  ]).pipe(
    map(([list, items]) => toBlogPosts(list, items)),
    shareReplay(1)
  );

  feed$: Observable<BlogPost[]> = concat(
    this.blog$.pipe(take(1)),
    this.optInListClick$.pipe(
      withLatestFrom(this.blog$),
      map(([_, items]) => items)
    ),
    shareReplay(1)
  );
  numNewItems$: Observable<number> = combineLatest([
    this.blog$,
    this.feed$
  ])
    .pipe(
      map(([a, b]) => Math.abs(a.length - b.length))
    );


  constructor(public blogService: BlogBasicService) {
    this.blogService.fetchPosts();
    this.blogService.fetchComments();
  }

  addPost() {
    this.blogService.addPost({ title: this.post });
  }
}
