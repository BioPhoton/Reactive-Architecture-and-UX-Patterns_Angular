import {Component, Input, Output} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {map, shareReplay, startWith, switchMap} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'state-selection',
  template: `
    <div class="case-content">
      <form *ngIf="derivation$ | async as formGroup" [formGroup]="formGroup">
        <mat-form-field *ngFor="let c of formGroup.controls | keyvalue">
          <label>{{ c.key }}</label>
          <input matInput [formControlName]="c.key"/>
        </mat-form-field>
      </form>
    </div>
  `
})
export class StartStateSelectionComponent {
  formModel$ = new ReplaySubject(1);

  @Input()
  set formGroupModel(modelFromInput: { [key: string]: any }) {
    if (modelFromInput) {
      this.formModel$.next(modelFromInput);
    }
  }

  derivation$: Observable<FormGroup> = this.formModel$.pipe(
    startWith({}),
    map(input => this.getFormGroupFromConfig(input))
  );

  @Output()
  formValueChange = this.derivation$.pipe(
    switchMap((fg: FormGroup) => fg.valueChanges)
  );

  constructor(private fb: FormBuilder) {
  }

  getFormGroupFromConfig(modelFromInput) {
    const config = Object.entries(modelFromInput).reduce(
      (c, [name, initialValue]) => ({...c, [name]: [initialValue]}),
      {}
    );
    return this.fb.group(config);
  }
}
