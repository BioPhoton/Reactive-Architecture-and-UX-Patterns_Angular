import {Component} from '@angular/core';
import {of, Subject} from 'rxjs';

@Component({
  selector: 'state-selection-container',
  template: `
    <h2>Selection Handling</h2>
    <div class="case-content">
      <pre>{{ values$ | async | json }}</pre>
      <state-selection
        [formGroupModel]="formGroupModel$ | async"
        (formValueChange)="values$.next($event)"
      >
      </state-selection>
    </div>
  `
})
export class StartStateSelectionContainerComponent {
  values$ = new Subject();

  formGroupModel$ = of({
    name: '',
    age: 0
  });
}
