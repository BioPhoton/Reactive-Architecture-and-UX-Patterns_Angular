import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {SwitchMapBlogService} from './switch-map-blog.service';
import {Observable, Subject} from 'rxjs';
import {Post} from 'shared';
import {switchMap, tap} from "rxjs/operators";


@Component({
  selector: 'solution-switchMap',
  template: `
    <h1>(Solution) switchMap</h1>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SolutionSwitchMapComponent {
  searchChanges$ = new Subject<string>();
  postSearchResult$: Observable<Post[]> = this.searchChanges$.pipe(
     switchMap((searchString) => this.blogPostService.searchPosts(searchString)),
    tap(result => console.log('searchResult', result))
  );

  constructor(public blogPostService: SwitchMapBlogService) {
  }

  search(e: any) {
    this.searchChanges$.next(e.target.value);
  }

}
