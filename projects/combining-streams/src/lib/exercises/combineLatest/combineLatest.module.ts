import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./combineLatest.routes";
import {MatButtonModule} from "@angular/material/button";
import {SolutionCombineLatestComponent} from "combining-streams/lib/exercises/combineLatest/solution.combineLatest.component";
import {StartCombineLatestComponent} from "combining-streams/lib/exercises/combineLatest/start.combineLatest.component";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    StartCombineLatestComponent,
    SolutionCombineLatestComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class CombineLatestModule {
}
