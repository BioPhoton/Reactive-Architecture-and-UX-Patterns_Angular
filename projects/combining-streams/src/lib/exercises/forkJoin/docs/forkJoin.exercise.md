# Combining HTTP requests - Exercise

## Intro

We want to build a simple Blog application. 
To get things started let's display a simple list of `BlogPost`.
There are HTTP Endpoints which provide us with `Comment` & `Post` data.
In addition, we want to add new `BlogPost` entries to the list without having to manually reload the data.
 
## Exercise

Use `forkJoin` operator to combine the http calls for comments and posts.
You can find the methods `httpGetComments` and `httpGetPosts` in the `ForkJoinBlogService` service.
  
After retrieving the 2 results from the `forkJoin` creation function,
we use the `map` operator to calculate the new list of `BlogPost` with `toBlogPosts`.


**Interfaces**
```Typescript
// entity
interface Post {
    id: string;
    title: string;
    content: string;
}
// entity
interface Comment {
    id: string;
    postId: string;
    text: string;
}
// derivation
interface BlogPost { 
    id: string;
    title: string;
    comments: Comment[];
    commentCount: number;
}
```

We start in the component with the service already implemented. 
`toBlogPosts` function can be imported from the `shared` folder.

**Component**
```Typescript
// start.forkJoin.component.ts 

export class StartForkJoinComponent {
  // ...

  blog$: Observable<BlogPost[]>; // join http calls and mat to blog posts here 
  
  constructor(private blogPostService: ForkJoinBlogService) {
  }

}
```
