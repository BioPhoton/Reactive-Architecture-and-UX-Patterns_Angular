import {StartSubscriptionLessComponent} from "./start.subscription-less.component";
import {SolutionSubscriptionLessComponent} from "./solution.subscription-less.component";

export const ROUTES = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StartSubscriptionLessComponent
      },
      {
        path: 'solution',
        component: SolutionSubscriptionLessComponent
      }
    ]
  }
];
