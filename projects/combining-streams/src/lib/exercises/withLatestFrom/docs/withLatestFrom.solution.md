# Opt-in updates - Solution

Staging new arriving data with `withLatestFrom`:

**Component**
```Typescript
// solution.withLatestFrom.component.ts 

blog$ = combineLatest([
    this.blogService.posts$.pipe(filter(l => !!l.length)),
    this.blogService.comments$.pipe(filter(l => !!l.length))
]).pipe(
    map(([list, items]) => toBlogPosts(list, items)),
    shareReplay(1)
);

feed$: Observable<BlogPost[]> = concat(
    this.blog$.pipe(take(1)),
    this.optInListClick$.pipe(
      withLatestFrom(this.blog$),
      map(([_, items]) => items)
    ),
    shareReplay(1)
);
numNewItems$: Observable<number> = combineLatest([
    this.blog$,
    this.feed$
])
.pipe(
  map(([a, b]) => Math.abs(a.length - b.length))
);
```

Great! ... we need some text here :)
