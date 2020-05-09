import {StartWithLatestFromComponent} from "./start.withLatestFrom.component";
import {SolutionWithLatestFromComponent} from "./solution.withLatestFrom.component";

export const ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                component: StartWithLatestFromComponent
            },
            {
                path: 'solution',
                component: SolutionWithLatestFromComponent
            }
        ]
    }
];
