import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import { BlogBasicService, BlogPost, toBlogPosts } from 'shared';


@Component({
  selector: 'solution-custom-http-service-v1',
  template: `<h3>(Solution) custom-http-service-v1</h3>

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
export class SolutionHttpServiceV1Component {

  blog$: Observable<BlogPost[]>;

  constructor(public listService: BlogBasicService) {
    this.refetch();
  }

  addPost() {
    this.listService.httpPostPost({title: 'new post'})
      .subscribe((v) => {
        console.log(v);
        // this.fetchPosts();
      }, console.log);
    this.refetch();
  }

  refetch() {
    this.blog$ = this.getBlogList();
  }

  private getBlogList(): Observable<BlogPost[]> {
    return forkJoin([
      this.listService.httpGetPosts(),
      this.listService.httpGetComments()
    ])
      .pipe(
        map(([posts, comments]) => toBlogPosts(posts, comments))
      );
  }

}
