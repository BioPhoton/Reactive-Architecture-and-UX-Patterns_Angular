import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./subscription-handling.routes";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {StartSubscriptionHandlingComponent} from "./start.subscription-handling.component";
import {SolutionSubscriptionHandlingComponent} from "./solution.subscription-handling.component";

@NgModule({
  declarations: [
    StartSubscriptionHandlingComponent,
    SolutionSubscriptionHandlingComponent
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
export class SubscriptionHandlingModule {
}
