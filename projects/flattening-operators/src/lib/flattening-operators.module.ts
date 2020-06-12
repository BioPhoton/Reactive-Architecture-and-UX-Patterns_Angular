import {NgModule} from '@angular/core';
import {FlatteningOperatorsContainerComponent} from "./flattening-operators.container.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./flattening-operators.routes";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    FlatteningOperatorsContainerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class FlatteningOperatorsModule {
}
