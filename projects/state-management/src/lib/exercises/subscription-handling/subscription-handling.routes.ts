import {SolutionSubscriptionHandlingComponent} from "./solution.subscription-handling.component";
import {StartSubscriptionHandlingComponent} from "./start.subscription-handling.component";

export const ROUTES = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StartSubscriptionHandlingComponent
      },
      {
        path: 'solution',
        component: SolutionSubscriptionHandlingComponent
      }
    ]
  }
];
