import * as utils from '../utils';
import { Route, Methods } from './route_shared';

export const route: Route = {
    path: '/df',
    method: Methods.GET,
    description: 'Get disk usage',
    options: { command: 'df -h' },
    func: utils.run_command
};