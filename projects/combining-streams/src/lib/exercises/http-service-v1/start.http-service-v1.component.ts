import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {combineLatest, forkJoin, Observable} from "rxjs";
import {JoinedItem, mergeListsAndItems} from "shared";
import {StartHttpV1Service} from "combining-streams/lib/exercises/http-service-v1/start.http-v1.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'custom-http-service-v1',
  template: `<h3>custom-http-service-v1</h3>

  <button (click)="listService.addItems({iName: 'new item', lId: 1})">AddItem</button>

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
export class StartHttpServiceV1Component {

  list$: Observable<JoinedItem[]> = forkJoin([
    this.listService.httpGetLists(),
    this.listService.httpGetItems()
  ]).pipe(
    map(([lists, items]) => mergeListsAndItems(lists, items))
  );

  constructor(private listService: StartHttpV1Service) {

  }

}
