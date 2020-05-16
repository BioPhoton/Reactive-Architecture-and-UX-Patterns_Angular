# [EPISODE_NAME] - Theory
    
## Intro
<!-- 
    General usage, type transformations, behaviour
-->

## Marble diagram

![[EPISODE_NAME]-[DIAGRAM_NAME]](../assets/images/episode-one_diagram1.png)

## Example Snippet
<!--
    The snippet should
- include all used imports
    ```typescript
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
```
- use typings as little as possible
- use the `$` convention
- name sources `source$`, `source1$`, `sourceA$`
    ```typescript
const source$ = from([1, 2, 3]);
```
- name resulting compositions `result$`, `result1$`, `resultA$`
    ```typescript
const result$ = source$.pipe(
...
);
```
- should have one operator per line in the `pipe` section
    ```typescript
source$.pipe(
    map(...),
    filter(...)
);
```
- if possible, should have comments in the same line
    ```typescript
source$.pipe(
    map(...), // transformation here
    filter(...) // only valid emissions
);
```
- should have subscribe block in the same line
    ```typescript
result$
    .subscribe(
        ...
    );
```
- should have an observer object as it's most clear
    ```typescript
result$
    .subscribe({
        next(num: number) { console.log(num); }
    });
```
- should have emissions comma separated and in the same line. The type should be clearly visible
    ```typescript
result$
    .subscribe({
        next(v) { console.log(v); } // false, 1, 'two', '3', {}, []
    });
```
- name resulting subscriptions `subscription`, `subscription1`, `subscriptionA`
    ```typescript
const subscription = result$
    .subscribe({
      ...
    });
```

-->

## Example explanation
