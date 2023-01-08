import * as utils from '../utils';
import { Route, Methods } from './route_shared';

export const route: Route = {
    path: '/uptime',
    method: Methods.GET,
    description: 'Get system uptime',
    options: { command: 'uptime' },
    func: utils.run_command
};