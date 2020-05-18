# Combination Operators Comparison - Solution

![Combination operators comparison - solution](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-comparison-solution-screenshot_michael-hladky.png)
_Combination operators comparison - solution_

To create the different combinations we compose and subscribe to int in the ngAfterViewInit section.


**Component**
```Typescript
import {combineLatest, zip} from 'rxjs';
import {withLatestFrom, map} from 'rxjs/operators';

ngAfterViewInit(): void {
    //... 

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
```

This gives us rendered values in the template, and we can compare the different behaviors.
For the given example we discover the following behavior: 
- All behaviors need the first value from both, the click position and the div width
- `combineLatest` calculates the click position even if we only resize the screen. 
  We get an incorrectly calculate click side in several cases, also the calculation on width change is not necessary here.  
- `withLatestFrom` perfectly loves the calculation of the click position. It takes the last value from the divs width and only calculates on click events.
- `zip` gives the worst result here. As we calculate the position by pairing click position and width in the order we result in behavior not matching the user's clicks and resizes. 

## Subscription and Subjects

Let's have a closer look at how we connected the values to the template. 

In our component we  1 property `subscription` and  3 predefined Subjects named `clickResultCombine$`, `clickResultWithLatest$` and `clickResultZip$`  

```typescript
  subscription = new Subscription();

  clickResultCombine$ = new Subject<string>();
  clickResultWithLatest$ = new Subject<string>();
  clickResultZip$ = new Subject<string>();

  constructor(private elemRef: ElementRef) {
  }

  ngAfterViewInit(): void {
     // ...
  }
```

In our the `ngAfterViewInit` method we forward the composed values in the subscription:  

```Typescript
    this.subscription.add(
      combineLatest([clickPosX$, elemWith$])
        .pipe(
          map(([posX, width]) => this.getSideOfClick(posX, width)),
        )
        .subscribe(this.clickResultCombine$)
    );
```

Here we use the `add` method of our subscription instance. 
`this.subscription.add(observable$.subscribe());`

This allows us to add other subscriptions to the existing one by adding it as a nested subscription.
If we call unsubscribe on the main subscription we also unsubscribe from all added subscriptions.

In the subscribe call we see  the following `.subscribe(this.clickResultCombine$)`.

`clickResultCombine$` is a Subject. It exposes the `next`, `error`, and `complete` method.
`subscribe` takes and Observer object which maintains the methods `next`, `error`, and `complete`.

Due to the described signatures we could write the following code:

```typescript
observable$
    .subscribe({
        next(nextValue) { subject1.next(nextValue) },
        error(errorValue) { subject1.next(errorValue) },
        complete(nextValue) { subject1.complete() }
    });
```

In a way shorter form like this:

```typescript
observable$
    .subscribe(subject1)
```






