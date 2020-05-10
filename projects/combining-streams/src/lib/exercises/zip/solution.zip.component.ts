import {Component} from '@angular/core';
import {combineLatest, Observable, zip} from "rxjs";
import {filter, map, shareReplay, tap} from "rxjs/operators";
import {JoinedItem, mergeListsAndItems} from "shared";
import {zipListService} from "combining-streams/lib/exercises/zip/zip-list.service";

@Component({
  selector: 'solution-zip',
  template: `<h3>(solution) zip</h3>

  <mat-form-field>
    <label>Name</label>
    <input matInput name="iName" [(ngModel)]="iName"/>
  </mat-form-field>
  <button mat-raised-button color="primary"  (click)="listService.addItem({'iName': iName, 'lId': 1})">AddItem</button>

  <p><b>renders: {{renders()}}</b></p>
  <p><b>processJoinedList: {{processJoinedList()}}</b></p>
  <p><b>processLikedList: {{processLikedList()}}</b></p>
  <div class="row">
    <div style="width: 49%" *ngIf="joinedList$ | async as list">
      <b>All items</b>
      <mat-list>
        <mat-list-item *ngFor="let item of list">
          {{item.iName}} - {{item.lName}}
        </mat-list-item>
      </mat-list>
    </div>

    <div style="width: 49%" *ngIf="likedItems$ | async as likedItems">
      <b>Liked items</b>
      <mat-list>
        <mat-list-item *ngFor="let item of likedItems">
          {{item.iName}} - {{item.lName}}
        </mat-list-item>
      </mat-list>
    </div>
  </div>
  `,
  styles: [`
    .row {
      width: 100%;
      display: flex;
    }
  `]
})
export class SolutionZipComponent {
  iName = 'my new item';
  numRenders = 0;

  renders() {
    return ++this.numRenders
  }

  numProcessJoinedList = 0;

  processJoinedList() {
    return this.numProcessJoinedList
  }

  numProcessLikedList = 0;

  processLikedList() {
    return this.numProcessLikedList
  }

  joinedList$ = combineLatest([
    this.listService.lists$.pipe(
      filter(l => !!l.length)
    ),
    this.listService.items$.pipe(
      filter(l => !!l.length)
    )
  ]).pipe(
    map(([list, items]) => mergeListsAndItems(list, items)),
    tap(v => ++this.numProcessJoinedList),
    shareReplay(1)
  );
  likedIds$ = this.joinedList$.pipe(map(list => list
    .filter(i => i.liked)
    .map(i => i.iId))
  );

  likedItems$: Observable<JoinedItem[]> = zip(
    this.joinedList$,
    this.likedIds$
  )
    .pipe(
      map(([mergedList, likedIds]) => (mergedList.filter(i => likedIds.find(li => li === i.iId)))),
      tap(v => ++this.numProcessLikedList)
    );

  constructor(public listService: zipListService) {
    this.listService.refetchLists();
    this.listService.refetchItems();
  }
}
