import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {fromEvent, ReplaySubject, Subject, Subscription} from "rxjs";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'comparison',
  template: `
    <h1>Comparison combination operators</h1>

    <div #box class="box">
      <div class="click-area"></div>
      <div class="separation"></div>
      <div class="click-pos">&nbsp;</div>

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
  styleUrls: ['./comparison.component.scss']
})
export class StartComparisonComponent implements AfterViewInit, OnDestroy {
  subscription = new Subscription();

  @ViewChild('box')
  boxViewChild

  clickResultCombine$ = new Subject<string>();
  clickResultWithLatest$ = new Subject<string>();
  clickResultZip$ = new Subject<string>();

  constructor(private elemRef: ElementRef) {

  }

  ngAfterViewInit(): void {
    const clickPosX$ = fromEvent(this.boxViewChild.nativeElement, 'click').pipe(
      tap((e: any) => {
        const elem = this.elemRef.nativeElement.querySelector('.click-pos');
        elem.style.top = `${e.offsetY - 15}px`;
        elem.style.left = `${e.offsetX - 15}px`;
        elem.style.display = 'block';
      }),
      map((e) => e['offsetX'])
    );
    this.subscription.add(
      clickPosX$.subscribe(cPX => console.log('clickPosX', cPX))
    );


    const elemWidth$ = fromEvent(window, 'resize').pipe(
      map(() => this.boxViewChild.nativeElement.getBoundingClientRect().width)
    );
    this.subscription.add(
      elemWidth$.subscribe(w => console.log('elemWidth', w))
    );

  }

  getSideOfClick(posX: number, width: number): string {
    return (width / 2) < posX ? 'Right' : 'Left';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
