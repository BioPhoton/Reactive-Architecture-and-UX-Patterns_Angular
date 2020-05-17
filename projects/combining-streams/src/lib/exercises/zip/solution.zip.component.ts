import {Component} from '@angular/core';
import {combineLatest, Observable,} from 'rxjs';
import {map, share, shareReplay, tap} from 'rxjs/operators';
import {BlogPost, toBlogPosts} from 'shared';
import {ZipBlogService} from "combining-streams/lib/exercises/zip/zip-blog-post.service";

@Component({
  selector: 'solution-zip',
  template: `<h3>(Solution) zip</h3>

  <mat-form-field>
    <label>Name</label>
    <input matInput name="post" [(ngModel)]="title"/>
  </mat-form-field>
  <button mat-raised-button color="primary" (click)="blogPostService.addPost({title: title})">Add Comment
  </button>

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
export class SolutionZipComponent {
  title = 'my new Title';
  numProcessJoinedList = 0;
  numRenders = 0;
  numProcessLikedList = 0;

  blog$ = combineLatest([
    this.blogPostService.posts$,
    this.blogPostService.comments$
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

  constructor(public blogPostService: ZipBlogService) {
    this.blogPostService.fetchPosts();
    this.blogPostService.fetchComments();
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
