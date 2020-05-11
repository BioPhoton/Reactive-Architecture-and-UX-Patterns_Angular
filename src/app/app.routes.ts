import {LandingPageComponent} from "./landing-page.component";

export const ROUTES = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'landing-page'
    },
    {
        path: 'landing-page',
        component: LandingPageComponent
    },
   {
        path: 'combining-streams',
        loadChildren: () => import('combining-streams').then(m => m.CombiningStreamsModule)
    },
   {
        path: 'state-management',
        loadChildren: () => import('state-management').then(m => m.StateManagementModule)
    }
];
