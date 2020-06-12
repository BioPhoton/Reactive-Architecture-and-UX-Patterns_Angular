import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Post} from 'shared';
import {MergeMapBlogService} from "./mergeMap-blog.service";
import {mergeMap} from "rxjs/operators";

@Component({
  selector: 'mergeMap',
  template: `
    <h1>mergeMap</h1>
    <mat-list>
      <mat-list-item *ngFor="let item of posts$ | async">
        <span mat-line>{{item.title}}</span>
        <button mat-raised-button color="accent" (click)="delete(item.id)">Delete</button>
      </mat-list-item>
    </mat-list>
  `
})
export class StartMergeMapComponent {
  posts$: Observable<Post[]> = this.blogPostService.posts$;
  deletePostIds$ = new Subject<number>();

  constructor(public blogPostService: MergeMapBlogService) {
    this.deletePostIds$
      .pipe(
        mergeMap(id => this.blogPostService.httpDeletePosts({id}))
      )
      .subscribe(
        () => this.blogPostService.fetchPosts()
      );
  }

  delete(id: number) {
    this.deletePostIds$.next(id);
  }

}
