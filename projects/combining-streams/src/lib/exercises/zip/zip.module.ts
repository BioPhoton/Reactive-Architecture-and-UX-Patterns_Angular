import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./zip.routes";
import {MatButtonModule} from "@angular/material/button";
import {StartZipComponent} from "combining-streams/lib/exercises/zip/start.zip.component";
import {SolutionZipComponent} from "combining-streams/lib/exercises/zip/solution.zip.component";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    StartZipComponent,
    SolutionZipComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ZipModule {
}
