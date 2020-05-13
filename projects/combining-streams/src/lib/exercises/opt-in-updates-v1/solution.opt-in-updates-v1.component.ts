import { Component } from '@angular/core';
import { combineLatest, concat, Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, take, withLatestFrom } from 'rxjs/operators';
import { BlogBasicService, toBlogPosts } from 'shared';

@Component({
  selector: 'solution-opt-in-updates-basic',
  template: `<h3>(Solution) Opt-in Updates</h3>

  <mat-form-field>
    <label>Name</label>
    <input matInput name="comment" [(ngModel)]="comment"/>
  </mat-form-field>
  <button mat-raised-button color="primary" (click)="listService.addComment({'text': comment, 'postId': 1})">AddItem</button>

  <ng-container *ngIf="(numNewItems$ | async) as numItems">
    <button mat-raised-button color="accent"
            *ngIf="numItems > 0"
            (click)="optInListClick$.next($event)">
      Update List ({{(
      numItems
    )}})
    </button>
  </ng-container>

  <div *ngIf="acceptedItems$ | async as blog">
    <mat-list>
      <mat-list-item *ngFor="let post of blog">
        <span mat-line>{{post.title}}</span>
        <span mat-line>Comments: {{post.commentCount}}</span>
      </mat-list-item>
    </mat-list>
  </div>
  `
})
export class SolutionOptInUpdatesV1Component {

  comment = 'my new comment';
  optInListClick$ = new Subject();

  blog$ = combineLatest([
    this.listService.posts$.pipe(filter(l => !!l.length)),
    this.listService.comments$.pipe(filter(l => !!l.length))
  ]).pipe(
    map(([list, items]) => toBlogPosts(list, items)),
    shareReplay(1)
  );

  acceptedItems$ = concat(
    this.blog$.pipe(take(1)),
    this.optInListClick$.pipe(
      withLatestFrom(this.blog$),
      map(([_, items]) => items)
    )
  );
  numNewItems$: Observable<number> = combineLatest([
    this.blog$,
    this.acceptedItems$
  ])
    .pipe(
      map(([a, b]) => Math.abs(a.length - b.length))
    );


  constructor(public listService: BlogBasicService) {
    this.listService.fetchPosts();
    this.listService.fetchComments();
  }

}
