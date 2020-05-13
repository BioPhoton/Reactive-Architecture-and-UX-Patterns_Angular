import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";
import {ForkJoinListService} from "./forkJoin-list.service";
import {BlogPost} from "shared";

@Component({
  selector: 'solution-forkJoin',
  template: `
    <h3>forkJoin</h3>
    <mat-list>
      <mat-list-item *ngFor="let item of list$ | async">
        {{item.iName}} - {{item.lName}}
      </mat-list-item>
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class StartForkJoinComponent {

  list$: Observable<BlogPost>;

  constructor(private listService: ForkJoinListService) {
  }

}
