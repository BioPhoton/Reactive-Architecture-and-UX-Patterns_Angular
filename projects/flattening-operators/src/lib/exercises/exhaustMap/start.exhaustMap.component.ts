import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from 'shared';
import {ExhaustMapBlogService} from "./exhaustMap-blog.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'exhaustMap',
  template: `
    <h1>exhaustMap</h1>
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
  `
})
export class StartExhaustMapComponent {
  post = 'My new post';

  blog$: Observable<Post[]>;

  constructor(public blogPostService: ExhaustMapBlogService) {

  }

  add() {
    this.blogPostService.addPost({title: this.post})
  }

  update() {
    console.log('posts update fired')
    this.blog$ = this.blogPostService.httpGetPosts();
  }


}
