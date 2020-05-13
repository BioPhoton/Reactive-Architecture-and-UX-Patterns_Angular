# `combineLatest` creation function - Theory

Often operators are special forms or sub forms of other operators.
If we take a look at the overview of combination patterns we realize that 2 of the look similar, forkJoin and combine.

They both process the values of the included Observables together, but `combineLatest` in comparison to `forkJoin` allows us to 
process **every new value** with the latest values of the other included Observables.

![Combination pattern combine and forkJoin](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-forkJoin-vs-combine_michael-hladky.png)

An example of processing ongoing Observables with `combineLates` looks like that:

```Typescript
import { interval, combineLatest } from "rxjs";
import { map } from "rxjs/operators";

const source1$ = interval(1000);
const source2$ = interval(1000).pipe(map(i => i * 10));

const result$ = combineLatest([source1$, source2$]);
result$
  .subscribe((result) => {
    console.log(result) // [0,0], [1, 10], [2, 20], [3, 30], ...
  })        
```
![combineLatest - inner ongoing](assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-combineLatest-inner-ongoing_michael-hladky.png)

A nice behaviour here is even if one of the included Observables completes we process further values from other ongoing Observables.

![combineLatest - inner complete](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-combineLatest-inner-complete2_michael-hladky.png)

Only if all included Observables complete the resulting Observable also complete.

![combineLatest - inner complete all](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-combineLatest-inner-complete_michael-hladky.png)

If an internal Observable errors, the resulting Observable also errors.

![combineLatest - inner error](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-combineLatest-inner-error_michael-hladky.png)
