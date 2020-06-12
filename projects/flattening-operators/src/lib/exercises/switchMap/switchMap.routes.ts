import {StartSwitchMapComponent} from "./start.switchMap.component";
import {SolutionSwitchMapComponent} from "./solution.switchMap.component";

export const ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                component: StartSwitchMapComponent
            },
            {
                path: 'solution',
                component: SolutionSwitchMapComponent
            }
        ]
    }
];
