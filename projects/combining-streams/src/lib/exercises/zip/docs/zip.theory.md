# zip behavior and gotchas


So far the discussed operators where always  combining independent Observables, 
and the processing get either done for each once of focusing on a primary stream.
`zip` is different here.

## Behavior 

`zip` waits for every value of each involved Observable and forwards
 one emission for all incoming emissions, meaning it emits one time all first emissions together, 
 one time all second emissions together and so on and so for. 
 
 If values take longer than others it waits with the emission. 
 Also, if one stream is emitting faster than the other it is waiting with emissions and caches the emitted values until other included streams emitted the same number of times to emit them together.
 
An example where the emissions wait for their other related Observables could be two polling mechanisms that depend on each other.
In this example we use random intervals to demonstrate this:
```Typescript
import {interval, zip} from 'rxjs';
const input1$ = interval(500); // emission rate varying between 1000 and 3000 ms
const input2$ = interval(1000);

const result$ = zip(input1$, input2$);
result$.subscribe(
([input1, input2]) => console.log(input1, input2)
); 
// logs all first, second, third values together: 1 1, 2 2, 3 3, 4 4, 5 5, 6 6
```
As we can see the numbers get logged in pairs and in the right order.
If one stream is faster than the other, the values of the faster one get cached and emitted when its related values arrive.

Here a visual representation of the above example:
![zip - different rates](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-zip-different-rates_michael-hladky.png)
_zip - different rates_

Also, for completely random emission rates zip always emits in the right pairs. 

![zip - inner ongoing](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-zip-inner-ongoing_michael-hladky.png)
_zip - inner ongoing_

Errors get forwarded as with all other combination operators. Same btw, is valid for the sibling operator `zipWith`.

![zip - inner error](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-zip-inner-error_michael-hladky.png)
_zip - inner error_

A completion event of one Observable causes the operatro to internally wait for all missing pair values and then completes.

![zip - inner complete](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-zip-inner-complete_michael-hladky.png)
_zip - inner complete_

## 💡 Gotcha(s)!
Be aware that `zip` can buit up a huge cache if the emission rate is too different.
Also, if one of them never emits you have a memory leak.

![zip - never emits if one source never emits](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-zip-never-emits_michael-hladky.png)
_zip - never emits if one source never emits_

If on of the observables complete without any emission the operator also completes and unsubscribes from all other included Observables internally.
![zip - EMPTY results in  immediate completion](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-zip-empty-completes_michael-hladky.png)
_zip - EMPTY results in  immediate completion_

