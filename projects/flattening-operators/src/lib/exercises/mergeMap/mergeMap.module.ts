import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./mergeMap.routes";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {StartMergeMapComponent} from "./start.mergeMap.component";
import {SolutionMergeMapComponent} from "./solution.mergeMap.component";

@NgModule({
  declarations: [
    SolutionMergeMapComponent,
    StartMergeMapComponent
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
export class MergeMapModule {
}
