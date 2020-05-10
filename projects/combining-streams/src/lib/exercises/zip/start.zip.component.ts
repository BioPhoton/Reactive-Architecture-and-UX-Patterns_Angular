import {Component} from '@angular/core';
import {combineLatest, Observable,} from "rxjs";
import {JoinedItem, mergeListsAndItems} from "shared";
import {map, tap} from "rxjs/operators";
import {zipListService} from "combining-streams/lib/exercises/zip/zip-list.service";

@Component({
  selector: 'zip',
  template: `<h3>zip</h3>

  <mat-form-field>
    <label>Name</label>
    <input matInput name="iName" [(ngModel)]="iName"/>
  </mat-form-field>
  <button (click)="listService.addItem({'iName': iName, 'lId': 1})">AddItem</button>

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
export class StartZipComponent {
  iName: string = '';
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
    this.listService.lists$,
    this.listService.items$
  ]).pipe(
    map(([list, items]) => mergeListsAndItems(list, items)),
    tap(v => ++this.numProcessJoinedList)
  );
  likedIds$ = this.joinedList$.pipe(map(list => list
    .filter(i => i.liked)
    .map(i => i.iId))
  );

  likedItems$: Observable<JoinedItem[]> = combineLatest([
    this.joinedList$,
    this.likedIds$
  ])
    .pipe(
      map(([mergedList, likedIds]) => (mergedList.filter(i => likedIds.find(li => li === i.iId)))),
      tap(v => ++this.numProcessLikedList)
    );

  constructor(private listService: zipListService) {
    this.listService.refetchLists();
    this.listService.refetchItems();
  }
}
