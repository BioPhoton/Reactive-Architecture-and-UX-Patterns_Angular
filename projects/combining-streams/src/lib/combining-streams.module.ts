import {NgModule} from '@angular/core';
import {CombiningStreamsContainerComponent} from "./combining-streams.container.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./combining-streams.routes";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    CombiningStreamsContainerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class CombiningStreamsModule {
}
