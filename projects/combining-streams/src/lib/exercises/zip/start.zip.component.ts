import {Component} from '@angular/core';
import {combineLatest, Observable, zip,} from 'rxjs';
import {distinctUntilChanged, filter, map, share, shareReplay, tap} from 'rxjs/operators';
import {BlogPost, toBlogPosts} from 'shared';
import {ZipBlogService} from "combining-streams/lib/exercises/zip/zip-blog-post.service";

@Component({
  selector: 'zip',
  template: `<h3>zip</h3>

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

    <div style="width: 49%" *ngIf="blogPosts$ | async as list">
      <b>All items</b>
      <mat-list>
        <mat-list-item *ngFor="let item of list">
          {{item.title}} - Comments: {{item.commentCount}}
        </mat-list-item>
      </mat-list>
    </div>


    <div style="width: 49%" *ngIf="commentedBlogPosts$ | async as likedItems">
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
  title = 'my new Title';
  numProcessJoinedList = 0;
  numRenders = 0;
  numProcessLikedList = 0;

  blogPosts$ = combineLatest([
    this.blogPostService.posts$.pipe(filter(list => !!list.length)),
    this.blogPostService.comments$.pipe(filter(list => !!list.length))
  ]).pipe(
    map(([list, items]) => toBlogPosts(list, items)),
    tap(v => ++this.numProcessJoinedList),
    share()
  );

  commentedIds$ = this.blogPosts$.pipe(
    map(list => list
      .filter(item => item.commentCount > 0)
      .map(item => item.id)
    )
  );

  //
  commentedBlogPosts$: Observable<BlogPost[]> = zip(
    this.blogPosts$,
    this.commentedIds$
  )
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
