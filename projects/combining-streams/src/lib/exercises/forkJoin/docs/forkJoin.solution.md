# Combining HTTP requests - Solution

## Implementation

**Component**
```Typescript
// solution.forkJoin.component.ts 

import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BlogPost, toBlogPosts} from 'shared';
import {ZipService} from './fork-join-blog.service';

export class SolutionForkJoinComponent {
  // ...

  blog$: Observable<BlogPost[]> = forkJoin([
        this.blogPostService.httpGetPosts(),
        this.blogPostService.httpGetComments()
    ])
    .pipe(
       map(([posts, comments]) => toBlogPosts(posts, comments))
    )
      
  constructor(private blogPostService: ZipService) {
  }

}
```

## Conclusion

Great! We managed to combine two http calls with the `forkJoin` operator into a single list of `BlogPost`. But what if we want to
handle ongoing Observables? In the next step we refactor our architecture to a minimal http caching solution.
