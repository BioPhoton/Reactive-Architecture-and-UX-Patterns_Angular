import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {combineLatest, Observable, Subject} from "rxjs";
import {map, withLatestFrom} from "rxjs/operators";
import {JoinedItem, ListService, mergeListsAndItems} from "shared";

@Component({
    selector: 'opt-in-updates',
    template: `<h3>Opt-in Updates</h3>

    <mat-form-field>
        <label>Name</label>
        <input matInput (input)="nameInput.next($event)"/>
    </mat-form-field>

    <button mat-raised-button color="primary" (click)="saveClick.next($event)">
        Save
    </button>

    <button mat-raised-button color="accent"
            (click)="optInListClick.next($event)">
        Update List (optional number of items)
    </button>

    <!--
    DEBUG:
    joinedItemList$: {{numNewItems$ | async | json}}<br/>
    -->

    <div *ngIf="joinedItemList$ | async as list">
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
export class StartOptInUpdatesV1Component {

    nameInput = new Subject<Event>();
    nameValue$ = this.nameInput.pipe(map((e: any) => e.target.value));
    saveClick = new Subject<Event>();
    optInListClick = new Subject<Event>();

    joinedItemList$: Observable<JoinedItem[]> = combineLatest([
      this.s.lists$,
      this.s.items$
    ])
        .pipe(
            map(([lists, items]) => mergeListsAndItems(lists, items))
        );

    constructor(private s: ListService) {

    }

}
