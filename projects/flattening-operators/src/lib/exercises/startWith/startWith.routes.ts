import {StartStartWithComponent} from "./start.startWith.component";
import {SolutionStartWithComponent} from "./solution.startWith.component";

export const ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                component: StartStartWithComponent
            },
            {
                path: 'solution',
                component: SolutionStartWithComponent
            }
        ]
    }
];
