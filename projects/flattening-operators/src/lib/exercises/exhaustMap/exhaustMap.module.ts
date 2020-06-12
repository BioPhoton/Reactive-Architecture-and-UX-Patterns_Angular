import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./exhaustMap.routes";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {StartExhaustMapComponent} from "./start.exhaustMap.component";
import {SolutionExhaustMapComponent} from "./solution.exhaustMap.component";

@NgModule({
  declarations: [
    SolutionExhaustMapComponent,
    StartExhaustMapComponent
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
export class ExhaustMapModule {
}
