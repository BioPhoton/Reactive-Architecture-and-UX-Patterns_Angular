import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {combineLatest, concat, Observable, Subject} from "rxjs";
import {map, take, withLatestFrom} from "rxjs/operators";
import {JoinedItem, mergeListsAndItems} from "shared";
import {BasicStoreService} from "combining-streams/lib/exercises/opt-in-updates-v1/basic.store";

@Component({
  selector: 'solution-opt-in-updates-basic',
  template: `<h3>(Solution) Opt-in Updates</h3>
  <mat-form-field>
    <label>Name</label>
    <input matInput (input)="nameInput.next($event)"/>
  </mat-form-field>

  <button mat-raised-button color="primary" (click)="saveClick.next($event)">
    Save
  </button>

  <ng-container *ngIf="(numNewItems$ | async)+'' as numItems">
    <button mat-raised-button color="accent"
            *ngIf="numItems > 0"
            (click)="optInListClick.next($event)">
      Update List ({{(numItems)}})
    </button>
  </ng-container>

  <div *ngIf="joinedItemList$ | async as list">
    <mat-list>
      <mat-list-item *ngFor="let item of list">
        {{item.iName}}
      </mat-list-item>
    </mat-list>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SolutionOptInUpdatesV1Component {

  items$ = this.s.select('items');
  lists$ = this.s.select('lists');

  nameInput = new Subject<Event>();
  nameValue$ = this.nameInput.pipe(map((e: any) => e.target.value));
  saveClick = new Subject<Event>();
  optInListClick = new Subject<Event>();

  acceptedItems$ = concat(
    this.items$.pipe(take(1)),
    this.optInListClick.pipe(
      withLatestFrom(this.items$),
      map(([_, items]) => items)
    )
  );

  numNewItems$: Observable<number> = combineLatest(
    this.items$,
    this.acceptedItems$
  )
    .pipe(
      map(([a, b]) => Math.abs(a.length - b.length))
    );

  joinedItemList$: Observable<JoinedItem[]> = combineLatest([
    this.lists$,
    this.acceptedItems$
  ])
    .pipe(
      map(([lists, items]) => mergeListsAndItems(lists, items))
    );

  constructor(private s: BasicStoreService) {
    this.s.initState();
    this.s.connectUpsertManyItems(this.saveClick.pipe(
      withLatestFrom(this.nameValue$),
      map(([_, iName]) => ([{iId: ~~(Math.random() * 100) + '', iName, lId: '1'}]))
    ))
  }

}
