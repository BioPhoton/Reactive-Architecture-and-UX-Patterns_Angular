import {SolutionHttpServiceV1Component} from "./solution.http-service-v1.component";
import {StartHttpServiceV1Component} from "./start.http-service-v1.component";

export const ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                component: StartHttpServiceV1Component
            },
            {
                path: 'solution',
                component: SolutionHttpServiceV1Component
            }
        ]
    }
];
