import {Component} from '@angular/core';
import {combineLatest, concat, Observable, of, Subject} from "rxjs";
import {filter, map, shareReplay, take, withLatestFrom} from "rxjs/operators";
import {JoinedItem, mergeListsAndItems} from "shared";
import {optInUpdatesV1ListService} from "combining-streams/lib/exercises/opt-in-updates-v1/opt-in-updates-v1-list.service";

@Component({
  selector: 'solution-opt-in-updates-basic',
  template: `<h3>(Solution) Opt-in Updates</h3>

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

  <div *ngIf="acceptedItems$ | async as list">
    <mat-list>
      <mat-list-item *ngFor="let item of list">
        {{item.iName}}
      </mat-list-item>
    </mat-list>
  </div>
  `
})
export class SolutionOptInUpdatesV1Component {

  iName = 'my new item';
  optInListClick$ = new Subject();

  joinedList$ = combineLatest([
    this.listService.lists$.pipe(filter(l => !!l.length)),
    this.listService.items$.pipe(filter(l => !!l.length))
  ]).pipe(
    map(([list, items]) => mergeListsAndItems(list, items)),
    shareReplay(1)
  );

  acceptedItems$ = concat(
    this.joinedList$.pipe(take(1)),
    this.optInListClick$.pipe(
      withLatestFrom(this.joinedList$),
      map(([_, items]) => items)
    )
  );
  numNewItems$: Observable<number> = combineLatest([
    this.joinedList$,
    this.acceptedItems$
  ])
    .pipe(
      map(([a, b]) => Math.abs(a.length - b.length))
    );


  constructor(private listService: optInUpdatesV1ListService) {
    this.listService.refetchLists();
    this.listService.refetchItems();
  }

}
