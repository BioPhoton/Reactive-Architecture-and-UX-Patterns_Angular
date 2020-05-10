import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {combineLatest, fromEvent, ReplaySubject, Subscription, zip} from "rxjs";
import {map, shareReplay, startWith, tap, withLatestFrom} from "rxjs/operators";

@Component({
    selector: 'withLatestFrom',
    template: `<h3>(Solution) withLatestFrom</h3>

    <div #box class="box">
      <div class="separation">
      </div>
      <div class="click-result">
        combineLatest:
        {{clickResultCombine$ | async}}
      </div>
      <div class="click-result">
        withLatestFrom:
        {{clickResultWithLatest$ | async}}
      </div>
      <div class="click-result">
        zip:
        {{clickResultZip$ | async}}
      </div>
    </div>

    `,
  styles: [`
    .box {
      position: relative;
      width: 100%;
      height: 400px;
      border: 1px solid darkgray;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: lightcyan;
    }

    .separation {
      height: 400px;
      width: 50%;
      position: absolute;
      left: 0px;
      z-index: 0;
      border-right: 1px solid darkgray;
      background-color: lightgray;
    }

    .click-result {
      width: 250px;
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

  clickResultCombine$ = new ReplaySubject<string>(1);
  clickResultWithLatest$ = new ReplaySubject<string>(1);
  clickResultZip$ = new ReplaySubject<string>(1);

  ngAfterViewInit(): void {
    const clickPosX$ = fromEvent(this.boxViewChild.nativeElement, 'click').pipe(
      map((e) => e['offsetX']),
      shareReplay(1)
    );

    const elemWith$ = fromEvent(window, 'resize').pipe(
      map(() => this.boxViewChild.nativeElement.getBoundingClientRect().width),
      startWith(this.boxViewChild.nativeElement.getBoundingClientRect().width),
      shareReplay(1)
    );

    this.subscription.add(
      combineLatest([clickPosX$, elemWith$])
      .pipe(
        map(([posX, width]) => this.getSideOfClick(posX, width)),
      ).subscribe(this.clickResultCombine$)
    );

    this.subscription.add(clickPosX$
      .pipe(
        withLatestFrom(elemWith$),
        map(([posX, width]) => this.getSideOfClick(posX, width))
      ).subscribe(this.clickResultWithLatest$)
    );

    this.subscription.add(zip(clickPosX$, elemWith$)
      .pipe(
        map(([posX, width]) => this.getSideOfClick(posX, width))
      ).subscribe(this.clickResultZip$)
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getSideOfClick(posX: number, width: number) {
    return (width / 2) < posX ? 'Right' : 'Left';
  }

}
