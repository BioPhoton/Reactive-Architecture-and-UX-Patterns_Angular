import {Component} from '@angular/core';
import {StartStartWithBlogService} from "./start-startWith-blog.service";

@Component({
  selector: 'startWith',
  template: `
    <h1>startWith</h1>
    <mat-form-field>
      <label>Name</label>
      <input matInput name="post" (input)="search($event)"/>
    </mat-form-field>

    <mat-progress-bar mode="query" *ngIf="searching$ | async"></mat-progress-bar>
    <div *ngIf="postsSearchResult$ | async as list">
      <mat-list>
        <mat-list-item *ngFor="let item of list">
          <span mat-line>{{item.title}}</span>
        </mat-list-item>
      </mat-list>
    </div>
  `,
})
export class StartStartWithComponent {
  postsSearchResult$ = this.blogPostService.postsSearchResult$;
  searching$ = this.blogPostService.searchPending$

  constructor(public blogPostService: StartStartWithBlogService) {
    this.blogPostService.searchPosts('')
  }

  search(e: any) {
    this.blogPostService.searchPosts(e.target.value);
  }

}
