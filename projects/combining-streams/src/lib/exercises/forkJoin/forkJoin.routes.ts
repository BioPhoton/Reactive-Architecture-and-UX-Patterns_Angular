import {SolutionForkJoinComponent} from "./solution.forkJoin.component";
import {StartForkJoinComponent} from "./start.forkJoin.component";

export const ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                component: StartForkJoinComponent
            },
            {
                path: 'solution',
                component: SolutionForkJoinComponent
            }
        ]
    }
];
