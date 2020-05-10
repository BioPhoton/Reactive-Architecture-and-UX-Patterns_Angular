import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {JoinedItem, mergeListsAndItems} from "shared";
import {ForkJoinListService} from "combining-streams/lib/exercises/forkJoin/forkJoin-list.service";


@Component({
  selector: 'forkJoin',
  template: `<h3>(Solution) ForkJoin</h3>

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
export class SolutionForkJoinComponent {

  list$: Observable<JoinedItem[]> = forkJoin([
    this.listService.httpGetLists(),
    this.listService.httpGetItems()
  ]).pipe(
    map(([lists, items]) => mergeListsAndItems(lists, items))
  );

  constructor(private listService: ForkJoinListService) {
  }

}
