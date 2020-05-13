# Combining HTTP requests - Solution

## Combining Http Calls

We managed to combine two http calls with the `forkJoin` operator into a single list of `BlogPost`.

**Component**
```Typescript
// solution.forkJoin.component.ts 

import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BlogPost, toBlogPosts} from 'shared';
import {ForkJoinBlogService} from './fork-join-blog.service';

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
