# Combining ongoing Observables - Solution

Combining the http requests with the `combineLatest` operator:

**Component**
```Typescript
// solution.mergeMap.component.ts 

blog$: Observable<BlogPost[]> = combineLatest([
    this.blogPostService.posts$,
    this.blogPostService.comments$
])
.pipe(
  map(([posts, comments]) => toBlogPosts(posts, comments))
);
```

Great, `combineLatest` now enables us to handle the latest results of multiple **ongoing** `Observables`.
With this setup in place, we basically eliminated _over-fetching_. The list of `BlogPost` can be updated whenever the `posts$`, **or** the `comments$` change.
