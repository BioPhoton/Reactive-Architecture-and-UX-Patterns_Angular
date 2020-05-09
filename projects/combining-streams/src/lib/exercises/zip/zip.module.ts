import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./zip.routes";
import {MatButtonModule} from "@angular/material/button";
import {StartZipComponent} from "combining-streams/lib/exercises/zip/start.zip.component";
import {SolutionZipComponent} from "combining-streams/lib/exercises/zip/solution.zip.component";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    StartZipComponent,
    SolutionZipComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ZipModule {
}
