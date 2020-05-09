import {StartOptInUpdatesV1Component} from "combining-streams/lib/exercises/opt-in-updates-v1/start.opt-in-updates-v1.component";
import {SolutionOptInUpdatesV1Component} from "combining-streams/lib/exercises/opt-in-updates-v1/solution.opt-in-updates-v1.component";


export const ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                component: StartOptInUpdatesV1Component
            },
            {
                path: 'solution',
                component: SolutionOptInUpdatesV1Component
            }
        ]
    }
];
