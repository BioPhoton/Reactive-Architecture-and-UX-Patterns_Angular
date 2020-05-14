import {Component} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { BlogPost, toBlogPosts} from 'shared';
import {CombineLatestBlogService} from "./combine-latest-blog.service";

@Component({
  selector: 'combineLatest',
  template: `
    <h1>combineLatest</h1>
    <mat-form-field>
      <label>Name</label>
      <input matInput name="post" [(ngModel)]="post"/>
    </mat-form-field>
    <button mat-raised-button color="primary">Add Post</button>

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
export class StartCombineLatestComponent {
  post = 'my new post';

  blog$: Observable<BlogPost[]> = forkJoin([
    this.blogPostService.httpGetPosts(),
    this.blogPostService.httpGetComments()
  ])
    .pipe(
      map(([posts, comments]) => toBlogPosts(posts, comments))
    );

  constructor(public blogPostService: CombineLatestBlogService) {

  }


}
