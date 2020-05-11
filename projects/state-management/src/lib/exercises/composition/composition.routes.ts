import {StartCompositionComponent} from "./composition.component";
import {SolutionCompositionComponent} from "./solution.composition.component";

export const ROUTES = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StartCompositionComponent
      },
      {
        path: 'solution',
        component: SolutionCompositionComponent
      }
    ]
  }
];
