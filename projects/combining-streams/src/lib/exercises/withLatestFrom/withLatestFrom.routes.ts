import {StartWithLatestFromComponent} from "combining-streams/lib/exercises/withLatestFrom/start.withLatestFrom.component";
import {SolutionWithLatestFromComponent} from "combining-streams/lib/exercises/withLatestFrom/solution.withLatestFrom.component";


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
