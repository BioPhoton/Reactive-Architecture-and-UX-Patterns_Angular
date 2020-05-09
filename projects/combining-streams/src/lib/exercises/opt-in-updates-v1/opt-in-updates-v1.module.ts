import {StartOptInUpdatesV1Component} from "combining-streams/lib/exercises/opt-in-updates-v1/start.opt-in-updates-v1.component";
import {SolutionOptInUpdatesV1Component} from "combining-streams/lib/exercises/opt-in-updates-v1/solution.opt-in-updates-v1.component";
import {CommonModule} from "@angular/common";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./opt-in-updates-v1.routes";
import {NgModule} from "@angular/core";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    StartOptInUpdatesV1Component,
    SolutionOptInUpdatesV1Component
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class OptInUpdatesV1Module {
}
