import {StartStateSelectionContainerComponent} from "./start.state-selection.container.component";
import {SolutionStateSelectionContainerComponent} from "./solution.state-selection.container.component";


export const ROUTES = [
  {
    path: '',
    children: [
      {
        path: '',
        component: StartStateSelectionContainerComponent
      },
      {
        path: 'solution',
        component: SolutionStateSelectionContainerComponent
      }
    ]
  }
];
