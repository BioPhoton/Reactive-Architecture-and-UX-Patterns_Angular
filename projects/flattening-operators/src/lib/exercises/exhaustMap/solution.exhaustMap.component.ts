import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ExhaustMapBlogService} from './exhaustMap-blog.service';
import {Observable, Subject} from 'rxjs';
import {Post} from 'shared';
import {exhaustMap, tap} from "rxjs/operators";


@Component({
  selector: 'solution-exhaustMap',
  template: `
    <h1>(Solution) exhaustMap</h1>
    <mat-form-field>
      <label>Name</label>
      <input matInput name="post" [(ngModel)]="post"/>
    </mat-form-field>
    <button mat-raised-button color="primary" (click)="add()">Add Post</button>
    <button mat-raised-button color="primary" (click)="update()">Update Posts</button>

    <mat-list>
      <mat-list-item *ngFor="let item of blog$ | async">
        <span mat-line>{{item.title}}</span>
      </mat-list-item>
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SolutionExhaustMapComponent {
  post = 'My new post';

  refreshTrigger$ = new Subject();
  blog$: Observable<Post[]> = this.refreshTrigger$.pipe(
    exhaustMap(() => {
      console.log('posts update fired');
      return this.blogPostService.httpGetPosts()
    })
  );

  constructor(public blogPostService: ExhaustMapBlogService) {

  }

  add() {
    this.blogPostService.addPost({title: this.post})
  }

  update() {
    this.refreshTrigger$.next();
  }

}
