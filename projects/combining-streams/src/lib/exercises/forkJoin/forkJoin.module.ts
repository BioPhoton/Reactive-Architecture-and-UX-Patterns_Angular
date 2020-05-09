import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./forkJoin.routes";
import {MatButtonModule} from "@angular/material/button";
import {StartForkJoinComponent} from "./start.forkJoin.component";
import {SolutionForkJoinComponent} from "./solution.forkJoin.component";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    StartForkJoinComponent,
    SolutionForkJoinComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ForkJoinModule {
}
