import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogBasicService, BlogPost, mergeListsAndItems } from 'shared';


@Component({
  selector: 'solution-combineLatest',
  template: `<h3>(solution) combineLatest</h3>

  <mat-form-field>
    <label>Name</label>
    <input matInput name="text" [(ngModel)]="title"/>
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SolutionCombineLatestComponent {
  title: string = '';

  blog$: Observable<BlogPost[]> = combineLatest([
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

  addPost() {
    this.listService.addPost({title: this.title});
    this.refetch();
  }

  refetch() {
    this.listService.fetchPosts();
    this.listService.fetchComments();
  }
}
