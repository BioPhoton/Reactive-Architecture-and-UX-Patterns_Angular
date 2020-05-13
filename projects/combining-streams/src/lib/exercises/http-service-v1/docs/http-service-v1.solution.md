# `forkJoin` Solution

## Combining Http Calls

Combining the http calls with the `forkJoin` operator:

```Typescript
forkJoin([
  this.listService.httpGetPosts(),
  this.listService.httpGetComments()
])
  .pipe(
    map(([posts, comments]) => mergeListsAndItems(posts, comments))
  )
```

## Refetch
Refetching data with `forkJoin` only works if every source emits new values. We have to re-call all
involved HTTP Request in order to update any information.

```html
<button mat-raised-button color="primary" (click)="addPost()">Add Post</button>
```

```Typescript
addPost() {
    this.listService.addPost({title: 'new post'});
    this.refetch();
}
refetch() {
    this.blog$ = this.getBlogList();
}

private getBlogList(): Observable<BlogPost[]> {
    return forkJoin([
      this.listService.httpGetPosts(),
      this.listService.httpGetComments()
    ])
      .pipe(
        map(([posts, comments]) => mergeListsAndItems(posts, comments))
      );
}
```
