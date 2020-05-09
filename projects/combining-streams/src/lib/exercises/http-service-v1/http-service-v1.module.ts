import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./http-service-v1.routes";
import {MatButtonModule} from "@angular/material/button";
import {StartForkJoinComponent} from "combining-streams/lib/exercises/forkJoin/start.forkJoin.component";
import {SolutionForkJoinComponent} from "combining-streams/lib/exercises/forkJoin/solution.forkJoin.component";
import {MatListModule} from "@angular/material/list";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    StartForkJoinComponent,
    SolutionForkJoinComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class HttpServiceV1Module {
}
