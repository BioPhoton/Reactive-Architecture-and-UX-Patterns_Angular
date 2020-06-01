# Processing dependent values - Exercise

![](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-process-dependent-values-with-zip_michael-hladky.png)

## Intro

In addition to our list of posts, we want to display a list of posts that have comments. 

The template for the new list of commented posts.
```html
<!--start.zip.component.ts-->
 <div class="row">
    <div style="width: 49%" *ngIf="blog$ | async as list">
      <b>All items</b>
      <mat-list>
        <mat-list-item *ngFor="let item of list">
          {{item.title}} - Comments: {{item.commentCount}}
        </mat-list-item>
      </mat-list>
    </div>


    <div style="width: 49%" *ngIf="commentedBlogPosts$ | async as commentedBlogPosts">
      <b>Commented posts</b>
      <mat-list>
        <mat-list-item *ngFor="let post of commentedBlogPosts">
          {{post.title}} - Comments: {{post.commentCount}}
        </mat-list-item>
      </mat-list>
    </div>
  </div>
```

We can solve this task by utilizing the `combineLatest` creation function:

```Typescript
// start.zip.component.ts

  // All blog posts 
  blog$ = combineLatest([
    this.blogPostService.posts$,
    this.blogPostService.comments$
  ]).pipe(
    map(([list, items]) => toBlogPosts(list, items)),
    tap(v => ++this.numProcessJoinedList)
  );

  commentedIds$ = this.blog$.pipe(
    map(list => list
      .filter(item => item.commentCount > 0)
      .map(item => item.id)
    )
  );

  // Only commented blog posts 
  commentedBlogPosts$: Observable<BlogPost[]> = combineLatest([
    this.blog$,
    this.commentedIds$
  ])
    .pipe(
      map(([mergedList, likedIds]) => (mergedList.filter(i => likedIds.find(li => li === i.id)))),
      tap(v => ++this.numProcessLikedList)
    );

  constructor(public blogPostService: ZipBlogService) {
    this.blogPostService.fetchPosts();
    this.blogPostService.fetchComments();
  }
```

However, this will result in way to many render cycles.
We can make the amount of renderings visible by introducing some helper variables and functions.

```typescript
// start.zip.component.ts

  // Counter properties
  numProcessJoinedList = 0;
  numRenders = 0;
  numProcessCommentedList = 0;

  processJoinedList() {
    return this.numProcessJoinedList;
  }

  renders() {
    return ++this.numRenders;
  }

  processCommentedList() {
    return this.numProcessCommentedList;
  }
```

```html
<!--start.zip.component.ts-->
  <p><b>renders: {{renders()}}</b></p>
  <p><b>processJoinedList: {{processJoinedList()}}</b></p>
  <p><b>processCommentedList: {{processCommentedList()}}</b></p>
```
When adding a new `BlogPost` to the list we realize the component is over-rendering, as the numbers are increasing un-proportionally to the data we receive.

![](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators_over-rendering-with-combineLatest_michael-hladky.png)

## Exercise

Try to minimize the amount of renderings.
Consider the following approaches:
 - use `zip` to combine dependent changes
 - filter out values which should not get processed
 - _share_ the outcome of the streams
