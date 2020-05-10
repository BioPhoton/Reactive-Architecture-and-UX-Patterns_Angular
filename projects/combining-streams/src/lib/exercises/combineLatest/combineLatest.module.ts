import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./combineLatest.routes";
import {MatButtonModule} from "@angular/material/button";
import {SolutionCombineLatestComponent} from "combining-streams/lib/exercises/combineLatest/solution.combineLatest.component";
import {StartCombineLatestComponent} from "combining-streams/lib/exercises/combineLatest/start.combineLatest.component";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    StartCombineLatestComponent,
    SolutionCombineLatestComponent
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
export class CombineLatestModule {
}
