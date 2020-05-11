import {Component} from '@angular/core';
import {tap} from 'rxjs/operators';
import {SourceService} from './source.service';
import {SubscriptionHandlingService} from './subscription.service';

@Component({
  selector: 'solution-subscription-handling',
  template: `
    <h2>Subscription Handling</h2>
    <div class="case-content">Process running internally</div>
  `,
  providers: [SubscriptionHandlingService]
})
export class SolutionSubscriptionHandlingComponent {
  process1$ = this.source.$.pipe(
    tap(num => {
      console.log('New value: ', num);
    })
  );

  constructor(
    private source: SourceService,
    private subs: SubscriptionHandlingService
  ) {
    this.subs.hold(this.process1$);
  }


}
