import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {combineLatest, forkJoin, NEVER, Observable} from "rxjs";
import {JoinedItem, ListService, mergeListsAndItems} from "shared";
import {map} from "rxjs/operators";
import {combineLatestListService} from "combining-streams/lib/exercises/combineLatest/combineLatest-list.service";

@Component({
    selector: 'combineLatest',
    template: `<h3>combineLatest</h3>

    <mat-form-field>
      <label>Name</label>
      <input matInput name="iName" [(ngModel)]="iName"/>
    </mat-form-field>
    <button (click)="listService.addItem({'iName': iName, 'lId': 1})">AddItem</button>

    <div *ngIf="list$ | async as list">
      <mat-list>
        <mat-list-item *ngFor="let item of list">
          {{item.iName}} - {{item.lName}}
        </mat-list-item>
      </mat-list>
    </div>
    `
})
export class StartCombineLatestComponent {
  iName: string = '';
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
