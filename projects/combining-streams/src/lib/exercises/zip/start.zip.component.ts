import { Component } from '@angular/core';
import { combineLatest, Observable, } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BlogBasicService, BlogPost, toBlogPosts } from 'shared';

@Component({
  selector: 'zip',
  template: `<h3>zip</h3>

  <mat-form-field>
    <label>Name</label>
    <input matInput name="comment" [(ngModel)]="comment"/>
  </mat-form-field>
  <button mat-raised-button color="primary" (click)="listService.addComment({'text': comment, 'postId': 1})">AddItem</button>

  <p><b>renders: {{renders()}}</b></p>
  <p><b>processJoinedList: {{processJoinedList()}}</b></p>
  <p><b>processLikedList: {{processLikedList()}}</b></p>
  <div class="row">

    <div style="width: 49%" *ngIf="blog$ | async as list">
      <b>All items</b>
      <mat-list>
        <mat-list-item *ngFor="let item of list">
          {{item.title}} - Comments: {{item.commentCount}}
        </mat-list-item>
      </mat-list>
    </div>


    <div style="width: 49%" *ngIf="commentedPosts$ | async as likedItems">
      <b>Liked items</b>
      <mat-list>
        <mat-list-item *ngFor="let item of likedItems">
          {{item.title}} - Comments: {{item.commentCount}}
        </mat-list-item>
      </mat-list>
    </div>
  </div>
  `,
  styles: [
      `
      .row {
        width: 100%;
        display: flex;
      }
    `
  ]
})
export class StartZipComponent {
  comment = 'my new item';
  numProcessJoinedList = 0;
  numRenders = 0;
  numProcessLikedList = 0;

  blog$ = combineLatest([
    this.listService.posts$,
    this.listService.comments$
  ]).pipe(
    map(([list, items]) => toBlogPosts(list, items)),
    tap(v => ++this.numProcessJoinedList)
  );
  commentedIds$ = this.blog$.pipe(map(list => list
    .filter(i => i.commentCount > 0)
    .map(i => i.id))
  );

  commentedPosts$: Observable<BlogPost[]> = combineLatest([
    this.blog$,
    this.commentedIds$
  ])
    .pipe(
      map(([mergedList, likedIds]) => (mergedList.filter(i => likedIds.find(li => li === i.id)))),
      tap(v => ++this.numProcessLikedList)
    );

  constructor(public listService: BlogBasicService) {
    this.listService.fetchPosts();
    this.listService.fetchComments();
  }

  processJoinedList() {
    return this.numProcessJoinedList;
  }

  renders() {
    return ++this.numRenders;
  }

  processLikedList() {
    return this.numProcessLikedList;
  }
}
