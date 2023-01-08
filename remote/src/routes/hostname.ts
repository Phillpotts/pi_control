import * as utils from '../utils';
import { Route, Methods } from './route_shared';

export const route: Route = {
    path: '/hostname',
    method: Methods.GET,
    description: 'Get Hostname',
    options: { command: 'hostname' },
    func: utils.run_command
};