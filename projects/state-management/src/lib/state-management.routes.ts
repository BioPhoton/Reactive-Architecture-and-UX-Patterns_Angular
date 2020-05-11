import {StateManagementContainerComponent} from "./state-management.container.component";

export const ROUTES = [
  {
    path: '',
    component: StateManagementContainerComponent,
    children: [
      {
        path: 'subscription-handling',
        loadChildren: () => import('./exercises/subscription-handling/subscription-handling.module')
          .then(m => m.SubscriptionHandlingModule)
      },
      {
        path: 'composition',
        loadChildren: () => import('./exercises/composition/composition.module')
          .then(m => m.CompositionModule)
      },
      {
        path: 'state-selection',
        loadChildren: () => import('./exercises/state-selection/state-selection.module')
          .then(m => m.StateSelectionModule)
      },
      {
        path: 'subscription-less',
        loadChildren: () => import('./exercises/subscription-less/subscription-less.module')
          .then(m => m.SubscriptionLessModule)
      }
    ]
  }
];
