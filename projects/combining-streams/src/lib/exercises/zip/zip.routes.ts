import {StartZipComponent} from "./start.zip.component";
import {SolutionZipComponent} from "./solution.zip.component";

export const ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                component: StartZipComponent
            },
            {
                path: 'solution',
                component: SolutionZipComponent
            }
        ]
    }
];
