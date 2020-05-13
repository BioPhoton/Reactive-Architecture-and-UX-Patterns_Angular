import {StartWithLatestFromComponent} from "combining-streams/lib/exercises/withLatestFrom/start.withLatestFrom.component";
import {SolutionWithLatestFromComponent} from "combining-streams/lib/exercises/withLatestFrom/solution.withLatestFrom.component";
import {CommonModule} from "@angular/common";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./withLatestFrom.routes";
import {NgModule} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    StartWithLatestFromComponent,
    SolutionWithLatestFromComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class WithLatestFromModule {
}
