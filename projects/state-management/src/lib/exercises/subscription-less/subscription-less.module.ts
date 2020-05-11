import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./subscription-less.routes";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {StartSubscriptionLessComponent} from "./start.subscription-less.component";
import {SolutionSubscriptionLessComponent} from "./solution.subscription-less.component";

@NgModule({
  declarations: [
    StartSubscriptionLessComponent,
    SolutionSubscriptionLessComponent
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
export class SubscriptionLessModule {
}
