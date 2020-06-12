import {FlatteningOperatorsContainerComponent} from "./flattening-operators.container.component";

export const ROUTES = [
  {
    path: '',
    component: FlatteningOperatorsContainerComponent,
    children: [
      {
        path: 'mergeMap',
        loadChildren: () => import('./exercises/mergeMap/mergeMap.module')
          .then(m => m.MergeMapModule)
      },
      {
        path: 'switchMap',
        loadChildren: () => import('./exercises/switchMap/switchMap.module')
          .then(m => m.SwitchMapModule)
      },
      {
        path: 'exhaustMap',
        loadChildren: () => import('./exercises/exhaustMap/exhaustMap.module')
          .then(m => m.ExhaustMapModule)
      },
      {
        path: 'startWith',
        loadChildren: () => import('./exercises/startWith/startWith.module')
          .then(m => m.StartWithModule)
      },
      {
        path: 'mergeAll',
        loadChildren: () => import('./exercises/mergeAll/mergeAll.module')
          .then(m => m.MergeAllModule)
      }
    ]
  }
];
