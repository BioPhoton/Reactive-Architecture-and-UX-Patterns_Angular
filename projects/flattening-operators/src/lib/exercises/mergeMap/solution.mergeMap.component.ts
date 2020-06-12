import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MergeMapBlogService} from './mergeMap-blog.service';
import {Observable, Subject} from 'rxjs';
import {Post} from 'shared';
import {exhaustMap, mergeMap, tap} from "rxjs/operators";


@Component({
  selector: 'solution-exhaustMap',
  template: `
    <h1>(Solution) exhaustMap</h1>
    <mat-list>
      <mat-list-item *ngFor="let item of posts$ | async">
        <span mat-line>{{item.title}}</span>
        <button mat-raised-button color="accent" (click)="delete(item.id)">Delete</button>
      </mat-list-item>
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SolutionMergeMapComponent {
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
    console.log('post delete fired')
    this.deletePostIds$.next(id);
  }

}
