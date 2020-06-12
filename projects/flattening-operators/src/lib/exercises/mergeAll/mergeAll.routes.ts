import {StartMergeAllComponent} from "./start.mergeAll.component";
import {SolutionMergeAllComponent} from "./solution.mergeAll.component";

export const ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                component: StartMergeAllComponent
            },
            {
                path: 'solution',
                component: SolutionMergeAllComponent
            }
        ]
    }
];
