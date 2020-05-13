import {Component} from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {BlogPost, toBlogPosts} from "shared";
import {ForkJoinBlogService} from "./fork-join-blog.service";


@Component({
  selector: 'solution-forkJoin',
  template: `
    <h1>(Solution) forkJoin</h1>
    <div *ngIf="blog$ | async as list">
      <mat-list>
        <mat-list-item *ngFor="let item of list">
          <span mat-line>{{item.title}}</span>
          <span mat-line>Comments: {{item.commentCount}}</span>
        </mat-list-item>
      </mat-list>
    </div>
  `
})
export class SolutionForkJoinComponent {

  blog$: Observable<BlogPost[]> = forkJoin([
    this.blogPostService.httpGetPosts().pipe(tap(console.log)),
    this.blogPostService.httpGetComments()
  ]).pipe(
    map(([posts, blog]) => toBlogPosts(posts, blog))
  );

  constructor(private blogPostService: ForkJoinBlogService) {
  }

}
