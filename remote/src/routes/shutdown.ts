import * as utils from '../utils';
import { Route, Methods } from './route_shared';

export const route: Route = {
    path: '/shutdown',
    method: Methods.GET,
    description: 'Shutdown system',
    options: { command: 'shutdown' },
    func: utils.run_command
};