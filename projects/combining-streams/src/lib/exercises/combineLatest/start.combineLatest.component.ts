import { Component } from '@angular/core';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogBasicService, BlogPost, mergeListsAndItems } from 'shared';

@Component({
  selector: 'combineLatest',
  template: `
    <h3>combineLatest</h3>
    <mat-form-field>
      <label>Title</label>
      <input matInput name="title" [(ngModel)]="title"/>
    </mat-form-field>
    <button mat-raised-button color="primary" (click)="addPost()">Add Post</button>
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
  title: string = '';

  blog$: Observable<BlogPost[]>;

  constructor(public listService: BlogBasicService) {
    this.refetch();
  }

  addPost() {
    this.listService.addPost({title: this.title});
    this.refetch();
  }

  refetch() {
    this.blog$ = this.getBlogList();
  }

  private getBlogList(): Observable<BlogPost[]> {
    return forkJoin([
      this.listService.posts$,
      this.listService.comments$
    ])
      .pipe(
        map(([posts, comments]) => mergeListsAndItems(posts, comments))
      );
  }
}
