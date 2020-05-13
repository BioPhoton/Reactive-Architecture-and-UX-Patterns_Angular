import { Component } from '@angular/core';
import { combineLatest, of, Subject } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { BlogBasicService, toBlogPosts } from 'shared';

@Component({
  selector: 'opt-in-updates',
  template: `<h3>Opt-in Updates</h3>

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

  comment = 'my new comment';
  optInListClick$ = new Subject();
  numNewItems$ = of(0);

  blog$ = combineLatest([
    this.listService.posts$.pipe(filter(l => !!l.length)),
    this.listService.comments$.pipe(filter(l => !!l.length))
  ]).pipe(
    map(([posts, comments]) => toBlogPosts(posts, comments)),
    shareReplay(1)
  );

  constructor(public listService: BlogBasicService) {
    this.listService.fetchPosts();
    this.listService.fetchComments();
  }

}
