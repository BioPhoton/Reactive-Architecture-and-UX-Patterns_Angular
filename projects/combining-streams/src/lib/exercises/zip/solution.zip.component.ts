import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Observable, zip} from "rxjs";
import {map} from "rxjs/operators";
import {JoinedItem, ListService, mergeListsAndItems} from "shared";

@Component({
    selector: 'solution-zip',
    template: `<h3>zip</h3>

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
export class SolutionZipComponent {

    list$: Observable<JoinedItem[]> = zip(
        this.s.lists$,
         this.s.items$
    )
        .pipe(
            map(([lists, items]) => mergeListsAndItems(lists, items))
        );

    constructor(public s: ListService) {

    }

}
