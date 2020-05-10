# Combining Stream and Behavior

![Reactive Architecture and UX Patterns - Combining Stream and Behavior](./assets/images/Reactive-architecture-and-ux-patterns_angular_combining-streams-and-behavior_michael-hladky.png)

This set of lessons are all about combination operators. 
As this course focuses on real-life use cases,  
we will use these operators in the context of state derivation, data fetching and update behavior.

We will start with some snippets of code people normally use.  
With our examples we will run into some problems with that simple approaches. 

As we go, we learn how to solve them, 
introduce more robust patterns and finally know all the does and donts of deriving state with combination operators. 

![Reactive Architecture and UX Patterns - Combination Operators](./assets/images/Reactive-architecture-and-ux-patterns_angular_combination-operators-dark_michael-hladky.png)

## Combination Operators - Operator Matrix

To get a better understanding of the operators in that group we create a matrix.
The operator matrix is something I came up with to show the relations of the different 
operators to each other and the similarities in behavior. 

| creation       | creation       |  operator         | operator    |
|----------------|----------------|-------------------|-------------|
| combineLatest  | forkJoin       | combineLatestWith | combineAll  |
| zip            |                | zipWith           | zipAll      |
|                |                | withLatestFrom    |             |

## Combination Operators - Algebraic approach

Another learning too I use, to teach people a more efficient learning of operators is the "Algebraic approach".
I named it that way because it borrows concepts and thinking from one of the broad parts of mathematics, [Algebra](https://en.wikipedia.org/wiki/Algebra).

> Literally translated Algebra means "reunion of broken parts".

Understanding the different operators in terms of their "broken parts" is unequally more efficient and intuitive than learning them one by one based on their name.

The list of broken parts from the above set looks like this:
`combineLatest`, `forkJoin`, `zip`, `withLatestFrom`, `With`, `All` 

If we understand every of those "broken parts" we are intuitively able to understand their "reunion", meaning the operators itself.

## Combination Operators - Exercise walk through

Within this set of lessons we will walk through the following exercises:

- We start we a simple setup where we derive data in our component directly over HTTP requests by using `forkJoin`
  - with this architecture we realize, we quickly run into the problem of over-fetching
- To solve it we refactor the give HTTP service to get more control over when we fetch the data
  - this reviles one of the special behaviours of `frokJoin` and we need to rethink it usage
- We learn the difference of `forkJoin` and `combineLatest` 
  - this knowledge helps us to refactor the service and component.
- As we go we start to introduce more features into our UI
   - again we run into a problem, this time over-rendering.
- To understand the problem we learn about the terms `Normalized` and `Denormalized` data 
  -  by using `zip` for our calculation we are able to solve the problem of over-rendering
- As it was quite technical so far we learn about `withLatestFrom` with a more playful example 
  - by doing so we understand the concept of `promary` and `secondary` streams
- With a fresh and open mine we think about those concepts in combination with a UX Pattern called `opt-in updates`
  - to give a better experience to our users we implement this pattern in our example

