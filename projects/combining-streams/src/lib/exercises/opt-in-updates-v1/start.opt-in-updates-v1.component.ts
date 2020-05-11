import {Component} from '@angular/core';
import {combineLatest, of, Subject} from "rxjs";
import {filter, map, shareReplay} from "rxjs/operators";
import {mergeListsAndItems} from "shared";
import {OptInUpdatesV1ListService} from "combining-streams/lib/exercises/opt-in-updates-v1/opt-in-updates-v1-list.service";

@Component({
  selector: 'opt-in-updates',
  template: `<h3>Opt-in Updates</h3>

  <mat-form-field>
    <label>Name</label>
    <input matInput name="iName" [(ngModel)]="iName"/>
  </mat-form-field>
  <button mat-raised-button color="primary" (click)="listService.addItem({'iName': iName, 'lId': 1})">AddItem</button>

  <ng-container *ngIf="(numNewItems$ | async) as numItems">
    <button mat-raised-button color="accent"
            *ngIf="numItems > 0"
            (click)="optInListClick$.next($event)">
      Update List ({{(numItems)}})
    </button>
  </ng-container>

  <div *ngIf="joinedList$ | async as list">
    <mat-list>
      <mat-list-item *ngFor="let item of list">
        {{item.iName}}
      </mat-list-item>
    </mat-list>
  </div>
  `
})
export class StartOptInUpdatesV1Component {

  iName = 'my new item';
  optInListClick$ = new Subject();
  numNewItems$ = of(0);

  joinedList$ = combineLatest([
    this.listService.lists$.pipe(filter(l => !!l.length)),
    this.listService.items$.pipe(filter(l => !!l.length))
  ]).pipe(
    map(([list, items]) => mergeListsAndItems(list, items)),
    shareReplay(1)
  );

  constructor(public listService: OptInUpdatesV1ListService) {
    this.listService.refetchLists();
    this.listService.refetchItems();
  }

}
