import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {combineLatest, fromEvent, ReplaySubject, Subject, Subscription} from "rxjs";
import {map, startWith, withLatestFrom} from "rxjs/operators";

@Component({
    selector: 'withLatestFrom',
    template: `<h3>(Solution) withLatestFrom</h3>

    <div #box class="box">
      <div class="separation">

      </div>

      <div class="click-result">
        {{clickResult$ | async}}
      </div>

    </div>

    `,
  styles: [`
    .box {
      position: relative;
      width: 100%;
      height: 300px;
      border: 1px solid darkgray;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: lightcyan;
    }

    .separation {
      height: 300px;
      width: 50%;
      position: absolute;
      left: 0px;
      z-index: 0;
      border-right: 1px solid darkgray;
      background-color: lightgray;
    }

    .click-result {
      width: 200px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      background-color: white;
      border: 1px solid darkgray;
      font-size: 20px;
      z-index: 1;
    }
  `]
})
export class SolutionWithLatestFromComponent  implements AfterViewInit, OnDestroy {
  subscription = new Subscription();

  @ViewChild('box')
  boxViewChild;

  clickResult$ = new ReplaySubject<string>(1);

  ngAfterViewInit(): void {
    const clickPosX$ = fromEvent(this.boxViewChild.nativeElement, 'click').pipe(
      map((e) => e['offsetX'])
    );

    const elemWith$ = fromEvent(window, 'resize').pipe(
      map(() => this.boxViewChild.nativeElement.getBoundingClientRect().width),
      startWith(this.boxViewChild.nativeElement.getBoundingClientRect().width)
    );

    this.subscription = clickPosX$
      .pipe(
        withLatestFrom(elemWith$),
        map(([posX, width]) => this.getSideOfClick(posX, width))
      ).subscribe(this.clickResult$);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getSideOfClick(posX: number, width: number) {
    return (width / 2) < posX ? 'Right' : 'Left';
  }

}
