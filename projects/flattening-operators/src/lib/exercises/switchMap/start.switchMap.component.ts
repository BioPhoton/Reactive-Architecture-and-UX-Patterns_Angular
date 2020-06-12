import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Post} from 'shared';
import {SwitchMapBlogService} from "./switch-map-blog.service";

@Component({
  selector: 'switchMap',
  template: `
    <h1>switchMap</h1>
    <mat-form-field>
      <label>Name</label>
      <input matInput name="post" (input)="search($event)"/>
    </mat-form-field>

    <div *ngIf="postSearchResult$ | async as list">
      <mat-list>
        <mat-list-item *ngFor="let item of list">
          <span mat-line>{{item.title}}</span>
        </mat-list-item>
      </mat-list>
    </div>
  `,
})
export class StartSwitchMapComponent {
  postSearchResult$ = new Subject<Post[]>();

  constructor(public blogPostService: SwitchMapBlogService) {
  }

  search(e: any) {
    this.blogPostService.searchPosts(e.target.value).subscribe(
      posts => this.postSearchResult$.next(posts)
    );
  }

}
