import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./mergeAll.routes";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {StartMergeAllComponent} from "./start.mergeAll.component";
import {SolutionMergeAllComponent} from "./solution.mergeAll.component";

@NgModule({
  declarations: [
    SolutionMergeAllComponent,
    StartMergeAllComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class MergeAllModule {
}
