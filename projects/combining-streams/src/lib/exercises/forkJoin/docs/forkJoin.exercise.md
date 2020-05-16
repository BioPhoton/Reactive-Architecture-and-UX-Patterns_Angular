# Combining HTTP requests - Exercise

## Intro

Since we want to build a simple Blog application, let's start by displaying a list of `BlogPost`.
There are HTTP Endpoints available which provide us with `Comment` & `Post` data. The task will be to combine the two Endpoints in
order to get the final list of `BlogPost`;
 
## Exercise

Use the `forkJoin` operator to combine the http calls for `Comment` & `Post`.
You can find the methods `httpGetComments` and `httpGetPosts` in the `ForkJoinBlogService` service.
  
After retrieving the 2 results from the `forkJoin` creation function,
we use the `map` operator to calculate the new list of `BlogPost` with `toBlogPosts`.

This `Component` will be the starting point for you. All needed dependencies are already included.

**Component**
```Typescript
// start.forkJoin.component.ts 
import {BlogPost, toBlogPosts} from 'shared';
import {ForkJoinBlogService} from './fork-join-blog.service';


export class StartForkJoinComponent {
  // ...

  blog$: Observable<BlogPost[]>; // join http calls and mat to blog posts here 
  
  constructor(private blogPostService: ForkJoinBlogService) {
  }

}
```
