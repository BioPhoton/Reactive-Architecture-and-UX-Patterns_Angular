import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Subject} from "rxjs";
import {map} from "rxjs/operators";

@Component({
    selector: 'withLatestFrom',
    template: `<h3>(Solution) withLatestFrom</h3>

    <button mat-raised-button color="primary" (click)="saveClick.next($event)">
        Save
    </button>

    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SolutionWithLatestFromComponent {
    nameInput = new Subject<string>();
    _name$ = this.nameInput.pipe(map((e: any) => e.target.value));
    saveClick = new Subject<Event>();


    constructor() {

    }

}
