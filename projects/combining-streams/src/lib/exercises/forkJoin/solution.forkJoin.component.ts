import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {forkJoin, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {BlogPost, mergeListsAndItems} from "shared";
import {ForkJoinListService} from "combining-streams/lib/exercises/forkJoin/forkJoin-list.service";


@Component({
  selector: 'forkJoin',
  template: `
    <h3>(Solution) ForkJoin</h3>
    <mat-list>
      <mat-list-item *ngFor="let item of list$ | async">
        {{item.iName}} - {{item.lName}}
      </mat-list-item>
    </mat-list>`
})
export class SolutionForkJoinComponent {

  list$: Observable<BlogPost[]> = forkJoin([
    this.listService.httpGetLists(),
    this.listService.httpGetItems()
  ]).pipe(
    map(([lists, items]) => mergeListsAndItems(lists, items))
  );

  constructor(private listService: ForkJoinListService) {
  }

}
