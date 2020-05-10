import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {fromEvent, ReplaySubject, Subject, Subscription} from "rxjs";
import {map, startWith, withLatestFrom} from "rxjs/operators";

@Component({
  selector: 'withLatestFrom',
  template: `<h3>withLatestFrom</h3>

  <div #box class="box">
    <div class="separation">

    </div>

    <div class="click-result">
      combineLatest
      {{clickResultCombine$ | async}}
    </div>
    <div class="click-result">
      withLatestFrom
      {{clickResultWithLatest$ | async}}
    </div>
    <div class="click-result">
      zip
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
export class StartWithLatestFromComponent implements AfterViewInit, OnDestroy {
  subscription = new Subscription();

  @ViewChild('box')
  boxViewChild;

  clickResultCombine$ = new ReplaySubject<string>(1);
  clickResultWithLatest$ = new ReplaySubject<string>(1);
  clickResultZip$ = new ReplaySubject<string>(1);

  constructor() {

  }

  ngAfterViewInit(): void {
    const clickPosX$ = fromEvent(this.boxViewChild.nativeElement, 'click').pipe(
      map((e) => e['offsetX'])
    );
    this.subscription.add(
      clickPosX$.subscribe(cPX => console.log('clickPosX', cPX))
    );


    const elemWith$ = fromEvent(window, 'resize').pipe(
      map(() => this.boxViewChild.nativeElement.getBoundingClientRect().width)
    );
    this.subscription.add(
      elemWith$.subscribe(w => console.log('elemWith', w))
    );

  }


  getSideOfClick(posX: number, width: number) {
    return (width / 2) < posX ? 'Right' : 'Left';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
