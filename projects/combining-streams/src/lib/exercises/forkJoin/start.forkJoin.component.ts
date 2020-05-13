import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";
import {ForkJoinBlogService} from "./fork-join-blog.service";
import {BlogPost, toBlogPosts} from "shared";

@Component({
  selector: 'solution-forkJoin',
  template: `
    <h1>forkJoin</h1>
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
export class StartForkJoinComponent {

  blog$: Observable<BlogPost[]>;

  constructor(private blogPostService: ForkJoinBlogService) {

  }

}
