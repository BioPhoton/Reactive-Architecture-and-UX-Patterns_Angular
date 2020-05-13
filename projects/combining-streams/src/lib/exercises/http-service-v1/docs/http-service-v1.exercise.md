# `forkJoin` Exercise

## Intro

We want to build a simple Blog application. 
To get things started let's display a simple list of `BlogPost`.
There are HTTP Endpoints which provide us with `Comment` & `Post` data.
In addition, we want to add new `BlogPost` entries to the list without having to manually reload the data.
 
## Exercise

- Use `forkJoin` operator to combine the http calls
- Implement automatic re-fetching after adding a `BlogPost`
  

## Interfaces

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
