import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {JoinedItem, mergeListsAndItems} from "shared";
import {combineLatestListService} from "combining-streams/lib/exercises/combineLatest/combineLatest-list.service";


@Component({
  selector: 'solution-custom-http-service-v1',
  template: `<h3>(Solution) custom-http-service-v1</h3>

  <button (click)="listService.addItem({iName: 'new item', lId: 1})">AddItem</button>

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

  list$: Observable<JoinedItem[]> = forkJoin([
    this.listService.lists$,
    this.listService.items$
  ])
    .pipe(
      map(([list, items]) => mergeListsAndItems(list, items))
    );

  constructor(private listService: combineLatestListService) {
    this.listService.refetchLists();
    this.listService.refetchItems();
  }

}
