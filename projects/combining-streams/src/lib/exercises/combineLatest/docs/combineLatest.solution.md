# Combining ongoing Observables - Solution

Combining the http calls with the `combineLatest` operator:

**Component**
```Typescript
// solution.combineLatest.component.ts 

blog$: Observable<BlogPost[]> = combineLatest([
    this.blogPostService.posts$,
    this.blogPostService.comments$
])
.pipe(
  map(([posts, comments]) => toBlogPosts(posts, comments))
);
```

With this setup we can process the list of blog posts whenever the posts, or the comments change.
