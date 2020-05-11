import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./state-selection.routes";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {StartStateSelectionContainerComponent} from "./start.state-selection.container.component";
import {SolutionStateSelectionContainerComponent} from "./solution.state-selection.container.component";
import {StartStateSelectionComponent} from "state-management/lib/exercises/state-selection/start.state-selection.component";
import {SolutionStateSelectionComponent} from "state-management/lib/exercises/state-selection/solution.state-selection.component";

@NgModule({
  declarations: [
    StartStateSelectionContainerComponent,
    StartStateSelectionComponent,
    SolutionStateSelectionContainerComponent,
    SolutionStateSelectionComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class StateSelectionModule {
}
