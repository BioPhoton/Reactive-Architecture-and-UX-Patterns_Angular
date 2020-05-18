# Combination Operators Comparison - Exercise

## Intro

![Combination operators comparison - exercise](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-comparison-solution-screenshot_michael-hladky.png)
_Combination operators comparison - exercise_

We have learned about each _combination operator_ individually. To get a deeper understanding about the differences
between them, we wrap it up by using them all together.

Let's implement a little game. In the start component you will find a board split into two panes.
The board saves the `click` events' latest position in an `Observable` source.
In the center there are three boxes, one for each _combining operator_. Each displaying its _combined_ value
of the click position.

```html
<h1>Comparison combination operators</h1>

<div #box class="box">
  <div class="click-area"></div>
  <div class="separation"></div>
  <div class="click-pos">&nbsp;</div>

  <div class="click-result">
    combine
    {{clickResultCombine$ | async}}
  </div>
  <div class="click-result">
    withLatest
    {{clickResultWithLatest$ | async}}
  </div>
  <div class="click-result">
    zip
    {{clickResultZip$ | async}}
  </div>
</div>
```

In the components we set up our view sources as `Subject`:
```typescript
export class SolutionComparisonComponent implements AfterViewInit, OnDestroy {
  // ...

  clickResultCombine$ = new Subject<string>();
  clickResultWithLatest$ = new Subject<string>();
  clickResultZip$ = new Subject<string>();
```

We setup the `click` binding in the `ngAfterViewInit` hook.
`clickPosX$` emits the position.
`elemWidth$` emits the boards' width. 

```typescript
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
      elemWith$.subscribe(w => console.log('elemWith', w))
    );

  }
```
`getSideOfClick` can be used to map the `click` Event to its corresponding board side.

```typescript
  getSideOfClick(posX: number, width: number): string {
    return (width / 2) < posX ? 'Right' : 'Left';
  }
```


## Exercise

Implement the view bindings `clickResultCombine$`, `clickResultWithLatest$` and `clickResultZip$` by using the following
 operators:

- `combineLatest`
- `combineLatestWith`
- `zip`
- `zipWith`
- `withLatestFrom`

Resize and click around and see how the different operators behave.
