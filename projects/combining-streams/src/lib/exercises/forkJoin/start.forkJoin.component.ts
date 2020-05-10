import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";
import {ForkJoinListService} from "./forkJoin-list.service";
import {JoinedItem} from "shared";

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

  list$: Observable<JoinedItem>;

  // this.listService.httpGetLists(),
  // this.listService.httpGetItems()
  // mergeListsAndItems(lists, items)

  constructor(private listService: ForkJoinListService) {
  }

}
