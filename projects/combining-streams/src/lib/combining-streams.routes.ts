import {ROUTES as COMBINE_LATEST} from './exercises/combineLatest/combineLatest.routes'
import {ROUTES as FORK_JOIN} from './exercises/forkJoin/forkJoin.routes'
import {ROUTES as WITH_LATEST_FROM} from './exercises/withLatestFrom/withLatestFrom.routes'
import {ROUTES as ZIP} from './exercises/zip/zip.routes';
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
        path: 'withLatestFrom',
        loadChildren: () => import('./exercises/withLatestFrom/withLatestFrom.module')
          .then(m => m.WithLatestFromModule)
      },
      {
        path: 'opt-in-updates-v1',
        loadChildren: () => import('./exercises/opt-in-updates-v1/opt-in-updates-v1.module')
          .then(m => m.OptInUpdatesV1Module)
      }
    ]
  }
];
