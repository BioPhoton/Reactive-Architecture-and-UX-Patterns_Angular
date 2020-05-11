import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MENU_ITEMS} from "./state-management.menu";

@Component({
    selector: 'state-management-container',
    template: `
        <h1>State Management</h1>
        <a mat-button *ngFor="let item of items"
                             [routerLink]="[item.link]">
            {{item.label}}
        </a>
        <br/>
        <router-outlet></router-outlet>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateManagementContainerComponent {
    items = MENU_ITEMS
}
