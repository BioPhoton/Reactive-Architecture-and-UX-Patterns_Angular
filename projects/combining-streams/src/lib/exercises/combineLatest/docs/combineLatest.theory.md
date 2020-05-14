# `combineLatest` creation function - Theory

In the previous example we learned how to combine multiple HTTP Requests into one stream with `forkJoin`.
Often operators are special forms or sub forms of other operators.
If we take a look at the overview of combination patterns we realize that tow of them look very similar, forkJoin and combine.

Both combine the values of the source Observables to one emission, but `combineLatest` in comparison to `forkJoin` does not rely
on all sources to complete. Thus allowing us to process ongoing Observables. If any of the sources emits **a new value**, the
result will update to the **latest values** of each source.

![Combination pattern combine and forkJoin](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-forkJoin-vs-combine_michael-hladky.png)

An example of processing ongoing Observables with `combineLatest`:

```Typescript
import { interval, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const source1$ = interval(1000); // ongoing, never completing source
const source2$ = interval(1000).pipe(map(i => i * 10));

const result$ = combineLatest([source1$, source2$]);
result$
  .subscribe((result) => {
    console.log(result) // [0,0], [1, 10], [2, 20], [3, 30], ...
  })        
```
The visual representation of the above example:

## 💡 Gotcha(s)!
Be careful, `combineLatest` will emit it's first value after **all** sources emitted at least one value or completed.
 
 ```Typescript
 import { interval, combineLatest, NEVER } from 'rxjs';
 import { map } from 'rxjs/operators';
 
 const source1$ = NEVER; // neither emitting, nor completing observable
 const source2$ = interval(1000).pipe(map(i => i * 10)); // ongoing, never completing source
 
 const result$ = combineLatest([source1$, source2$]);
 result$
   .subscribe((result) => {
     console.log(result) // will never emit any value
   })        
 ```

![combineLatest - inner ongoing](assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-combineLatest-inner-ongoing_michael-hladky.png)

Even if some sources `complete`, we are able to process future values from other ongoing Observables while keeping the
last emission of the completed ones.

![combineLatest - inner complete](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-combineLatest-inner-complete2_michael-hladky.png)

`combineLatest` completes when all sources `complete`.

![combineLatest - inner complete all](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-combineLatest-inner-complete_michael-hladky.png)

If an internal Observable errors, the resulting Observable also errors.

![combineLatest - inner error](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-combineLatest-inner-error_michael-hladky.png)
