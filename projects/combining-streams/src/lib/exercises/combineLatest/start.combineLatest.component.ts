import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { NEVER, Observable} from "rxjs";
import {JoinedItem, ListService} from "shared";

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
        {{list | json}}
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
export class StartCombineLatestComponent {

    /*
    1. Use `combineLatest` to join lists$ and todos$ from `SimpleTodoService`)
    2. Use `leftJoin(items, lists, 'lId')`
     */
    list$: Observable<JoinedItem[]> = NEVER;

    constructor(public s: ListService) {

    }

}
