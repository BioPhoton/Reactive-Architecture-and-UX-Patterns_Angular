import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./withLatestFrom.routes";
import {MatButtonModule} from "@angular/material/button";
import {StartWithLatestFromComponent} from "combining-streams/lib/exercises/withLatestFrom/start.withLatestFrom.component";
import {SolutionWithLatestFromComponent} from "combining-streams/lib/exercises/withLatestFrom/solution.withLatestFrom.component";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    StartWithLatestFromComponent,
    SolutionWithLatestFromComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class WithLatestFromModule {
}
