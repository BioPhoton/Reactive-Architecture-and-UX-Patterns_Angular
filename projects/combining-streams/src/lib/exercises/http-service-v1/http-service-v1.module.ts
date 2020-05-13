import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SolutionHttpServiceV1Component } from 'combining-streams/lib/exercises/http-service-v1/solution.http-service-v1.component';
import { StartHttpServiceV1Component } from 'combining-streams/lib/exercises/http-service-v1/start.http-service-v1.component';
import { ROUTES } from './http-service-v1.routes';

@NgModule({
  declarations: [
    StartHttpServiceV1Component,
    SolutionHttpServiceV1Component
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class HttpServiceV1Module {
}
