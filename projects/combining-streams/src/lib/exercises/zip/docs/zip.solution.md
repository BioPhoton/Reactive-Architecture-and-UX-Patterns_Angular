# Processing dependent values - Solution

The goal was to improve the performance of the commented blog post list. We measure the performance by counting
the number of processes which lead to a re-rendering of our component. 

We can further divide the performance metrics to:
- Numbers of processes for bootstrapping
- Numbers of processes for new data

## Initial measurements

**Numbers of processes for bootstrapping:**  
renders: 6  
processJoinedList: 27  
processCommentedList: 17

**Numbers of processes for new data:**  
renders: 8 (Δ2)  
processJoinedList: 33 (Δ6)  
processCommentedList: 21 (Δ4)

## Step 1 - lazy state
As a first improvement we will `skip` the first value of the `posts$` and `comments$` state since those are initial values which should not get
processed. This way the processing of `blogPosts$` starts with the first incoming value of the service.

```typescript
//solution.zip.component.ts

blogPosts$ = combineLatest([
    this.blogPostService.posts$.pipe(skip(1)),
    this.blogPostService.comments$.pipe(skip(1))
])
```

**Numbers of processes for bootstrapping:**  
renders: 5 (-1)  
processJoinedList: 15 (-12)  
processCommentedList: 9 (-8)

**Numbers of processes for new data:**  
renders: 7 (Δ2 => ~)   
processJoinedList: 21 (Δ6 => ~)  
processCommentedList: 13 (Δ4 => ~)

## Step 2 - sharing results
As `blogPosts$` gets subscribed to multiple times, we should share its processed values by using the `share` operator.

```typescript
//solution.zip.component.ts

blogPosts$ = combineLatest([
    this.blogPostService.posts$.pipe(skip(1)),
    this.blogPostService.comments$.pipe(skip(1))
]).pipe(
      map(([list, items]) => toBlogPosts(list, items)),
      tap(v => ++this.numProcessJoinedList),
      share()
    );
```

**Numbers of processes for bootstrapping:**  
renders: 5 (-1)  
processJoinedList: 5 (-22)  
processCommentedList: 9 (-8)

**Numbers of processes for new data:**  
renders: 7 (Δ2 => ~)   
processJoinedList: 7 (Δ2 => -4)  
processCommentedList: 13 (Δ4 => ~)

## Step 3 - stream dependencies

The first improvements didn't change the way of processing, still led to a performance boost.
To even further improve the performance of our application, lets take a closer look at the relations of the processed `Observables`.

We see that `blogPosts$` has a relation to `commentedIds$`, or in other words `commentedIds$` is a derivation of `blogPosts$`.

![](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-dependent-values_michael-hladky.png)

`commentedBlogPosts$` needs to process `blogPosts$` and `commentedIds$` in pairs. This helps to avoid not needed processings.

![](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators_over-rendering-with-combineLatest_michael-hladky.png)

![](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators_process-dependent-values_michael-hladky.png)

Let's implement `zip` and see how it impacts the amount of processings. 

```typescript
//solution.zip.component.ts

commentedBlogPosts$: Observable<BlogPost[]> = zip(
    this.blogPosts$,
    this.commentedIds$
)
    .pipe(
        map(([mergedList, commentedIds]) => (mergedList.filter(i => commentedIds.find(li => li === i.id)))),
        tap(v => ++this.numprocessCommentedList)
    );
```

**Numbers of processes for bootstrapping:**  
renders: 5 (-1)  
processJoinedList: 5 (-22)  
processCommentedList: 5 (-12)
 
**Numbers of processes for new data:**  
renders: 7 (Δ2 => ~)   
processJoinedList: 7 (Δ2 => -4)  
processCommentedList: 7 (Δ2 => -2)

## Conclusion

We initially improved render performance by skipping initial values and sharing results.
We then identified dependencies in our data flow and applied logic to take care of not needed processes.

In the next exercises we will take a closer look at the concepts of managing data structures and derivations.
You will understand those concepts and avoid the targeted problem of over-rendering id a better more scalable and productive way.
