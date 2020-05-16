# Combination Operators Comparison

As we did quite a lot od technical stuff it's time to relax and do some playful stuff.
Let's see how the combination operators compare to each other. :)
 
In this exercise we compare the different operators:
- `combineLatest`
- `combineLatestWith`
- `zip`
- `zipWith`
- `withLatestFrom`

We exclude `forkJoin` as we will process ongoing streams.

Also, the operators `zipAll` as well as `combineAll` are left out.
We will discuss `All` operators in a different chapter.

Let's take a closer look to the used RxJs functions.
We have 2 different types, operators and creators functions.

The operators of the listed functions always have the following signature:
`(Observable<T>) => (Observable<R>) => Observable<[T, R]>` 

In version `7` of RxJS there was a refactoring. 
The operator versions of `zip` and `combineLatest` got deprecated and the 
new operators `zipWith` and `combineLatestWith` got introduced.

Let's have a look at their usage.

**combineLatest and combineLatestWith**
```typescript
import {combineLatest, interval} from 'rxjs';
import {combineLatestWith} from 'rxjs/operators';

const source1$ = interval(1000);
const source2$ = interval(500);

const result1$ = combineLatest([source1$,source2$]);

const result2$ = source1$.pipe(
    combineLatestWith(source2$)
);
```

This 2 operators are siblings, one of them, `combineLates` is the creation function. 
The other, `combineLatestWith` is the operator. 


**zip and zipWith**
```typescript
// rxjs version 7
import {zip, interval} from 'rxjs';
import {zipWith} from 'rxjs/operators';

const source1$ = interval(1000);
const source2$ = interval(500);

const result1$ = zip([source1$,source2$]);

const result2$ = source1$.pipe(
    zipWith(source2$)
);
```

This 2 operators are similar to `combineLatest` siblings, 
The creation function is `zip` and the operator is `zipWith`.

**withLatestFrom**
```typescript
// rxjs version 7
import {interval} from 'rxjs';
import {withLatestFrom} from 'rxjs/operators';

const source1$ = interval(1000);
const source2$ = interval(500);

const result1$ = source1$.pipe(
    withLatestFrom(source2$)
);
```

For this behaviour we only have the operator. 
This creation function would not be that intuitive to use.

To get some more overview of the behaviour lets start a small exercise.



