import {StartMergeMapComponent} from "./start.mergeMap.component";
import {SolutionMergeMapComponent} from "./solution.mergeMap.component";

export const ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                component: StartMergeMapComponent
            },
            {
                path: 'solution',
                component: SolutionMergeMapComponent
            }
        ]
    }
];
