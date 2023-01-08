import * as utils from '../utils';
import { Route, Methods } from './route_shared';

export const route: Route = {
    path: '/shutdown/cancel',
    method: Methods.GET,
    description: 'Shutdown system',
    options: { command: 'shutdown -c' },
    func: utils.run_command
};