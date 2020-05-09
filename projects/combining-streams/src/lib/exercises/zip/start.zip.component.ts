import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { of, } from "rxjs";
import {Item, List, ListService} from "shared";

@Component({
    selector: 'zip',
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
export class StartZipComponent {

    list$ = of([[] as List[],[] as Item[]])
        .pipe(

        );

    constructor(public s: ListService) {

    }

}
