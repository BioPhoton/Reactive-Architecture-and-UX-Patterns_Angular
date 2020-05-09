# Combining Stream and Behavior

![Reactive Architecture and UX Patterns - Combining Stream and Behavior](./assets/images/Reactive-architecture-and-ux-patterns_angular_combining-streams-and-behavior_michael-hladky.png)
![Reactive Architecture and UX Patterns - Combination Operators](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-dark_michael-hladky.png)


- forkJoin => 2 http in component => Problem: over-fetching because http in component => 
- Http Service refactor to obs$ in service => forkJoin needs complete => intro combineLatest
- combineLatest =>theory => calculate with independent values => Intro num of Items in comp => over-rendering => 1 update 2 emissions
- zip for dependent state calculation values
- withLatestFrom => left right example => 
- opt-in example -> vanilla -> material-dialog

