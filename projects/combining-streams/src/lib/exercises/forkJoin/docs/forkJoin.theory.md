# `forkJoin` creation function - Theory

`forkJoin` belongs to the group of combination operators. 
The speciality of combining operators is the ability to process emissions from different observables together.
In particular combination operators return an array of items where the items are
emissions of the involved Observables in the provided order. So do `forkJoin`.

This operator get often used to combine http requests and process a new value of the 2 results.

```Typescript
import {forkJoin, Observable} from "rxjs";

const source1$ = of('A');
const source2$ = of(1);

const result$ = forkJoin([source1$, source2$]);
result$
  .subscribe((results) => {
    const result1 = results[0];
    const result2 = results[1];
    console.log(result1, result2);
  })        
```
![forkJoin http calls](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-forkJoin-http_michael-hladky.png)

As accessing the arrays items ofer their index is not that convenient we can use Array destruction to get the results.

```Typescript
result$
  .subscribe(([result1, result2]) => { console.log(result1, result2);})
```

Interesting to notice here is that it only returns the late emitted values of all included Observables.

![forkJoin all complete last](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-forkJoin-emit-all-last_michael-hladky.png)

Also, often overlooked is the fact it needs all included Observables to be completed after the value gets emitted.
This downside often occurs when refactoring to an architecture with staty streams of values.

![forkJoin no emission if not all complete](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-forkJoin-emit-after-all-complete_michael-hladky.png)


As we can see if not all included Observables complete, we never get a value out.

If an included Observable errors the resulting Observable errors too.
![forkJoin error](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-forkJoin-error_michael-hladky.png)
