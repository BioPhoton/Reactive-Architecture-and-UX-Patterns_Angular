import {NgModule} from '@angular/core';
import {StateManagementContainerComponent} from "./state-management.container.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./state-management.routes";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    StateManagementContainerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class StateManagementModule {
}
