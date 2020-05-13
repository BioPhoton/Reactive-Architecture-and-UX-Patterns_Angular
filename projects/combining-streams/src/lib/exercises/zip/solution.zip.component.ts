import { Component } from '@angular/core';
import { combineLatest, Observable, zip } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { BlogBasicService, BlogPost, mergeListsAndItems } from 'shared';

@Component({
  selector: 'solution-zip',
  template: `<h3>(solution) zip</h3>

  <mat-form-field>
    <label>Name</label>
    <input matInput name="comment" [(ngModel)]="comment"/>
  </mat-form-field>
  <button mat-raised-button color="primary" (click)="listService.addComment({'text': comment, 'postId': 1})">AddItem</button>

  <p><b>renders: {{renders()}}</b></p>
  <p><b>processJoinedList: {{processJoinedList()}}</b></p>
  <p><b>processLikedList: {{processLikedList()}}</b></p>
  <div class="row">
    <div style="width: 49%" *ngIf="joinedList$ | async as list">
      <b>All items</b>
      <mat-list>
        <mat-list-item *ngFor="let item of list">
          {{item.title}} - Comments: {{item.commentCount}}
        </mat-list-item>
      </mat-list>
    </div>

    <div style="width: 49%" *ngIf="commentedPosts$ | async as commentedPosts">
      <b>Liked items</b>
      <mat-list>
        <mat-list-item *ngFor="let item of commentedPosts">
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
export class SolutionZipComponent {
  comment = 'my new item';

  numProcessJoinedList = 0;
  numRenders = 0;
  numProcessLikedList = 0;


  joinedList$ = combineLatest([
    this.listService.posts$.pipe(
      filter(l => !!l.length)
    ),
    this.listService.comments$.pipe(
      filter(l => !!l.length)
    )
  ]).pipe(
    map(([list, items]) => mergeListsAndItems(list, items)),
    tap(v => ++this.numProcessJoinedList),
    shareReplay(1)
  );
  commentedIds$ = this.joinedList$.pipe(map(list => list
    .filter(i => i.commentCount > 0)
    .map(i => i.id))
  );

  commentedPosts$: Observable<BlogPost[]> = zip(
    this.joinedList$,
    this.commentedIds$
  )
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
