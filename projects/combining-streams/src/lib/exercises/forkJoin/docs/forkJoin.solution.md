# Combining HTTP requests - Solution

## Combining Http Calls

Combining the http calls with the `forkJoin` operator:

**Component**
```Typescript
// solution.forkJoin.component.ts 

import {forkJoin, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {BlogPost, toBlogPosts} from "shared";
import {ForkJoinBlogService} from "./fork-join-blog.service";

export class SolutionForkJoinComponent {
  // ...

  blog$: Observable<BlogPost[]> = forkJoin([
        this.blogPostService.httpGetPosts(),
        this.blogPostService.httpGetComments()
    ])
    .pipe(
       map(([posts, comments]) => toBlogPosts(posts, comments))
    )
      
  constructor(private blogPostService: ForkJoinBlogService) {
  }

}
```

As we can see, `forkJoin` (as well as all other combination operators) 
enable us to process the incoming values of multiple streams together. 
