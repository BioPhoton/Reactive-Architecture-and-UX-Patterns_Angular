import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {scan, shareReplay} from 'rxjs/operators';
import {SourceService} from './source.service';

@Component({
  selector: 'composition',
  template: `
    <h2>Composition Handling</h2>
    <label>Visible:</label>
    <input type="checkbox" [(ngModel)]="visible"/><br/>
    <div class="case-content" *ngIf="visible">
      numberOfEmissions{{ composition1$ | async }}
    </div>
  `
})
export class StartCompositionComponent implements OnDestroy {
  subscription = new Subscription();
  visible = false;
  hotComposition1$;

  composition1$ = this.source.$.pipe(
    scan(numOfEmissions => ++numOfEmissions, 0),
    shareReplay(1)
  );

  constructor(private source: SourceService) {
    // this.hotComposition1$ = this.composition1$.pipe(publishReplay(1)) as ConnectableObservable<any>
    // this.subscription-handling =  this.hotComposition1$.connect();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
