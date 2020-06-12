import {StartExhaustMapComponent} from "./start.exhaustMap.component";
import {SolutionExhaustMapComponent} from "./solution.exhaustMap.component";

export const ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                component: StartExhaustMapComponent
            },
            {
                path: 'solution',
                component: SolutionExhaustMapComponent
            }
        ]
    }
];
