import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MergeAllBlogService} from './mergeAll-blog.service';
import {from, Observable, Subject} from 'rxjs';
import {Post} from 'shared';
import {debounceTime, distinctUntilChanged, map, mergeAll, skip, switchMap, tap} from "rxjs/operators";
import {FormBuilder} from "@angular/forms";


@Component({
  selector: 'solution-switchMap',
  template: `
    <h1>(Solution) switchMap</h1>
    <form [formGroup]="editForm">
      <mat-form-field>
        <label>Title</label>
        <input matInput name="post" formControlName="title"/>
      </mat-form-field>
      <br/>
      <p>Last change to field: {{lastChange$ | async | json}}</p>
      <mat-form-field>
        <label>Description</label>
        <textarea
          matInput
          cdkTextareaAutosize
          cdkAutosizeMinRows="1"
          cdkAutosizeMaxRows="5"
          name="post"
          formControlName="description">
        </textarea>
      </mat-form-field>
    </form>
  `
})
export class SolutionMergeAllComponent {
  editForm = this.fb.group({
    title: [],
    description: []
  });

  arrayOfChangesByFieldObservables = Object.entries(this.editForm.controls).map(
    ([name, fc]) => fc.valueChanges.pipe(
      this.applyInputBehaviour,
      map(v => ({[name]: v})))
  );
  lastChange$ = from(this.arrayOfChangesByFieldObservables).pipe(
    mergeAll(),
    skip(1)
  );

  constructor(public blogPostService: MergeAllBlogService, private fb: FormBuilder) {
    this.updateForm(3);
  }

  updateForm(id) {
    this.blogPostService.httpGetPosts({id}).subscribe(
      posts => this.editForm.patchValue(posts.pop())
    );
  }

  applyInputBehaviour(o$) {
    return o$.pipe(
      distinctUntilChanged(),
      debounceTime(250)
    );
  }

}
