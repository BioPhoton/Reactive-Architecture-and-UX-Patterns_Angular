import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogBasicService, BlogPost, mergeListsAndItems } from 'shared';

@Component({
  selector: 'custom-http-service-v1',
  template: `<h3>custom-http-service-v1</h3>

  <button mat-raised-button color="primary" (click)="listService.addPost({title: 'new post'})">Add Post</button>

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
export class StartHttpServiceV1Component {

  blog$: Observable<BlogPost[]> = forkJoin([
    this.listService.httpGetPosts(),
    this.listService.httpGetComments()
  ])
    .pipe(
      map(([posts, comments]) => mergeListsAndItems(posts, comments))
    );

  constructor(public listService: BlogBasicService) {

  }

}
