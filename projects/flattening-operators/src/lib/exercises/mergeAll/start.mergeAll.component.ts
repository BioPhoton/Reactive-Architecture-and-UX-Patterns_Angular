import {Component} from '@angular/core';
import {from, of} from 'rxjs';
import {MergeAllBlogService} from "./mergeAll-blog.service";
import {FormBuilder} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, mergeAll, skip} from "rxjs/operators";

@Component({
  selector: 'mergeAll',
  template: `
    <h1>mergeAll</h1>
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
  `,
})
export class StartMergeAllComponent {
  editForm = this.fb.group({
    title: [],
    description: []
  });

  // Create a stream that contains the name of the field that changed lastly
  lastChange$ = of({title: 'Post 3'});

  constructor(public blogPostService: MergeAllBlogService, private fb: FormBuilder) {
    this.updateForm(3);
  }

  updateForm(id) {
    this.blogPostService.httpGetPosts({id}).subscribe(
      posts => this.editForm.patchValue(posts.pop())
    );
  }

}
