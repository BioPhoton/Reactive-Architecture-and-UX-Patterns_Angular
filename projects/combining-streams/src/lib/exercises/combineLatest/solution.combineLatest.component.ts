import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {JoinedItem, ListService, mergeListsAndItems} from "shared";


@Component({
    selector: 'combineLatest',
    template: `<h3>combineLatest</h3>

    <button mat-raised-button color="primary" (click)="s.refetchItems()">
        Refresh Items
    </button>
    <button mat-raised-button color="primary" (click)="s.refetchLists()">
        Refresh Lists
    </button>

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
export class SolutionCombineLatestComponent {

    list$: Observable<JoinedItem[]> = combineLatest(
        this.s.items$,
        this.s.lists$
    )
        .pipe(
            map(([items, lists]) => mergeListsAndItems(lists, items))
        );

    constructor(public s: ListService) {

    }

}
