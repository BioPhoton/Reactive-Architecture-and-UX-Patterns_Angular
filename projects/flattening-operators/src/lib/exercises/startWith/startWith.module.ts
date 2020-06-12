import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./startWith.routes";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {StartStartWithComponent} from "./start.startWith.component";
import {SolutionStartWithComponent} from "./solution.startWith.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    SolutionStartWithComponent,
    StartStartWithComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    MatProgressBarModule
  ]
})
export class StartWithModule {
}
