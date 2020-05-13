import { Component } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogBasicService, BlogPost, mergeListsAndItems } from 'shared';

@Component({
  selector: 'combineLatest',
  template: `
    <h3>combineLatest</h3>
    <mat-form-field>
      <label>Title</label>
      <input matInput name="comment" [(ngModel)]="comment"/>
    </mat-form-field>
    <button mat-raised-button color="primary" (click)="listService.addPost({'title': comment})">Add Post</button>
    <div *ngIf="blog$ | async as blog">
      <mat-list>
        <mat-list-item *ngFor="let post of blog">
          <span mat-line>{{post.title}}</span>
          <span mat-line>Comments: {{post.commentCount}}</span>
        </mat-list-item>
      </mat-list>
    </div>
  `
})
export class StartCombineLatestComponent {
  comment: string = '';

  blog$: Observable<BlogPost[]> = forkJoin([
    this.listService.posts$,
    this.listService.comments$
  ])
    .pipe(
      map(([posts, comments]) => mergeListsAndItems(posts, comments))
    );

  constructor(public listService: BlogBasicService) {
    this.listService.fetchPosts();
    this.listService.fetchComments();
  }
}
