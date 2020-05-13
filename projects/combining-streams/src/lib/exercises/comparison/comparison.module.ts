import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./comparison.routes";
import {MatButtonModule} from "@angular/material/button";
import {StartComparisonComponent} from "combining-streams/lib/exercises/comparison/start.comparison.component";
import {SolutionComparisonComponent} from "combining-streams/lib/exercises/comparison/solution.comparison.component";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    StartComparisonComponent,
    SolutionComparisonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ComparisonModule {
}
