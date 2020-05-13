import {StartComparisonComponent} from "./start.comparison.component";
import {SolutionComparisonComponent} from "./solution.comparison.component";

export const ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                component: StartComparisonComponent
            },
            {
                path: 'solution',
                component: SolutionComparisonComponent
            }
        ]
    }
];
