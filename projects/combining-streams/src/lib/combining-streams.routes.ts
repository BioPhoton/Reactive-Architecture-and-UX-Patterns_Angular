import {CombiningStreamsContainerComponent} from "./combining-streams.container.component";

export const ROUTES = [
  {
    path: '',
    component: CombiningStreamsContainerComponent,
    children: [
      {
        path: 'forkJoin',
        loadChildren: () => import('./exercises/forkJoin/forkJoin.module')
          .then(m => m.ForkJoinModule)
      },
      {
        path: 'combineLatest',
        loadChildren: () => import('./exercises/combineLatest/combineLatest.module')
          .then(m => m.CombineLatestModule)
      },
      {
        path: 'http-service-v1',
        loadChildren: () => import('./exercises/http-service-v1/http-service-v1.module')
          .then(m => m.HttpServiceV1Module)
      },
      {
        path: 'zip',
        loadChildren: () => import('./exercises/zip/zip.module')
          .then(m => m.ZipModule)
      },
      {
        path: 'comparison',
        loadChildren: () => import('./exercises/comparison/comparison.module')
          .then(m => m.ComparisonModule)
      },
      {
        path: 'withLatestFrom',
        loadChildren: () => import('./exercises/withLatestFrom/withLatestFrom.module')
          .then(m => m.WithLatestFromModule)
      }
    ]
  }
];
