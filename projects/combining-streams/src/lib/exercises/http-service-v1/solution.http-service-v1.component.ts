import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {JoinedItem, mergeListsAndItems} from "shared";
import {ForkJoinListService} from "combining-streams/lib/exercises/forkJoin/forkJoin-list.service";


@Component({
  selector: 'solution-custom-http-service-v1',
  template: `<h3>(Solution) custom-http-service-v1</h3>

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
export class SolutionHttpServiceV1Component {

  list$: Observable<JoinedItem[]> = forkJoin(
    this.listService.httpGetLists(),
    this.listService.httpGetItems()
  )
    .pipe(
      map(([listsResult, itemsResult]) => mergeListsAndItems(listsResult.lists, itemsResult.items))
    );

  constructor(private listService: ForkJoinListService) {

  }

}
