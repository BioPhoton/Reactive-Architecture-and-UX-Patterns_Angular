import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CombineLatestBlogService } from './combine-latest-blog.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogPost, toBlogPosts } from 'shared';


@Component({
  selector: 'solution-combineLatest',
  template: `
    <h1>(Solution) combineLatest</h1>
    <mat-form-field>
      <label>Name</label>
      <input matInput name="post" [(ngModel)]="post"/>
    </mat-form-field>
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
  post = 'my new post';

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
    this.blogPostService.addPost({ title: this.post });
  }

}
