import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {interval, Observable} from "rxjs";
import {ForkJoinListService} from "combining-streams/lib/exercises/forkJoin/forkJoin-list.service";

@Component({
  selector: 'solution-forkJoin',
  template: `<h3>forkJoin</h3>

  <div *ngIf="list$ | async as list">
    <mat-list>
      <mat-list-item *ngFor="let item of list">
        {{item.iName}} - {{item.lName}}
      </mat-list-item>
    </mat-list>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class StartForkJoinComponent {

  list$: Observable<any> = interval(1000);

  constructor(private listService: ForkJoinListService) {

  }

}
