import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BlogPost, toBlogPosts} from 'shared';
import {CombineLatestBlogService} from "combining-streams/lib/exercises/combineLatest/combine-latest-blog.service";


@Component({
  selector: 'solution-combineLatest',
  template: `
    <h1>(Solution) combineLatest</h1>
    <button mat-raised-button color="primary" (click)="addPost()">Add Post</button>

    <div *ngIf="blog$ | async as list">
      <mat-list>
        <mat-list-item *ngFor="let item of list">
          <span mat-line>{{item.title}}</span>
          <span mat-line>Comments: {{item.commentCount}}</span>
        </mat-list-item>
      </mat-list>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SolutionCombineLatestComponent {
  blog$: Observable<BlogPost[]> = combineLatest([
    this.blogPostService.posts$,
    this.blogPostService.comments$
  ])
    .pipe(
      map(([posts, comments]) => toBlogPosts(posts, comments))
    );

  constructor(public blogPostService: CombineLatestBlogService) {

  }

  addPost() {
    this.blogPostService.addPost({title: 'New post'});
  }

}
