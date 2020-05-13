# Combining ongoing Observables - Exercise

![](./assets/images/Reactive-architecture-and-ux-patterns_angular_over-fetching_michael-hladky.png)
![](./assets/images/Reactive-architecture-and-ux-patterns_angular_http-caching_michael-hladky.png)

## Intro
As processing HTTP calls directly in the component we run into "over-fetching" of data.
Over-fetching means we request data from the server more often than we need to.

This is a result of wrong state-management. 
We need the result of the HTTP request on a global level in the service.
From there, HTTP result can be cached, share with multiple components and replayed from the cache if needed.
 
To do so, we implemented a BehaviorSubject in our service as well as 
some new methods to update the services state.

**Service**
```Typescript
// combine-latest-blog.service.ts

private readonly state$ = new BehaviorSubject<BlogServiceState>({
    posts: [] as Post[],
    comments: [] as Comment[]
}); 

readonly posts$ = this.state$.pipe(map(s => s.posts));
readonly comments$ = this.state$.pipe(map(s => s.comments));

// ...

fetchPosts() {
this.httpGetPosts()
  .subscribe(posts => {
    this.state$.next({
      ...this.state$.getValue(),
      posts: upsertEntities(this.state$.getValue().posts, posts, 'id')
    });
  });
}

fetchComments() {
this.httpGetComments()
  .subscribe(comments => {
    this.state$.next({
      ...this.state$.getValue(),
      comments: upsertEntities(this.state$.getValue().comments, comments, 'id')
    });
  });
}

addPost(post: Pick<Post, 'title'>) {
this.httpPostPost(post)
  .subscribe((v) => {
    console.log(v);
    // this.fetchPosts();
  }, console.log);
}
```

We also initially fetch the posts and comments from the server when the service gets initiated.

**Service**
```Typescript
// combine-latest-blog.service.ts

// ...
constructor(...) {
    this.fetchPosts();
    this.fetchComments();
}
```

## Exercise

Use the properties `posts$` and `comments$` instead of `httpGetPosts` and `httpGetComments`.

If you click the "add post" button you will notice the calculated blog posts don't emit anymore.

This is because our new streams do not complete anymore, but forkJoin needs all included Observables to complete to emit a value.

We need to replace `forkJoin` with an operator that allows to process the values of running Observables. 

In this case `combineLatest` is a perfect match. 
Use it and see if the list of BlogPosts renders now.





