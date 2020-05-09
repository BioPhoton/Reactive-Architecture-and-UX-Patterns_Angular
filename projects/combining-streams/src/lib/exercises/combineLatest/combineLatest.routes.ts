import {StartCombineLatestComponent} from "./start.combineLatest.component";
import {SolutionCombineLatestComponent} from "./solution.combineLatest.component";

export const ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                component: StartCombineLatestComponent
            },
            {
                path: 'solution',
                component: SolutionCombineLatestComponent
            }
        ]
    }
];
