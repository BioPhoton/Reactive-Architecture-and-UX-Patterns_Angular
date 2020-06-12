import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./switchMap.routes";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {StartSwitchMapComponent} from "./start.switchMap.component";
import {SolutionSwitchMapComponent} from "./solution.switchMap.component";

@NgModule({
  declarations: [
    SolutionSwitchMapComponent,
    StartSwitchMapComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class SwitchMapModule {
}
