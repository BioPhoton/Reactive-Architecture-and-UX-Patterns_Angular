# Opt-in updates - Solution

Let's take a look at what we have implemented.

At first, we used `combineLatest` in order to create an `Observable` source representing
the number of new items to opt-in to. This represents the indication for the user when new updates
are available for display.


```Typescript
// solution.withLatestFrom.component.ts 

numNewItems$: Observable<number> = combineLatest([
    this.blog$,
    this.feed$
])
.pipe(
  map(([a, b]) => Math.abs(a.length - b.length))
);

```

Then, we have built the opt-in update logic by using the `optInListClick$` as trigger
to emit the _latest_ value of `blog$` utilizing `withLatestFrom`.

```Typescript
// solution.withLatestFrom.component.ts 

optInUpdate$: Observable<BlogPost[]> = this.optInListClick$.pipe(
   withLatestFrom(this.blog$),
   map(([_, items]) => items)
 );

```

Finally, we built the `feed$`. We wanted `feed$` to start with the first value emitted by `blog$`. That is
why we have combined the `optInUpdate$` with the first emission of `blog$` using the `concat` creation
function.

```Typescript
// solution.withLatestFrom.component.ts 

feed$: Observable<BlogPost[]> = concat(
    this.blog$.pipe(take(1)),
    this.optInUpdate$
).pipe(shareReplay(1));

```

Great! We learned how to build a mechanism for user controlled opt-in updates with `withLatestFrom`.
