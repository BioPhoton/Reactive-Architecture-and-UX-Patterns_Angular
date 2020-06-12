import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MENU_ITEMS} from "./flattening-operators.menu";

@Component({
    selector: 'combining-streams-container',
    template: `
        <h1>Combining Streams</h1>
        <a mat-button *ngFor="let item of items"
                             [routerLink]="[item.link]">
            {{item.label}}
        </a>
        <br/>
        <router-outlet></router-outlet>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlatteningOperatorsContainerComponent {
    items = MENU_ITEMS
}
