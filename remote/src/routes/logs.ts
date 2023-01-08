import * as path from 'path';
import * as utils from '../utils';
import { Route, Methods } from './route_shared';

export const route: Route = {
    path: '/logs',
    method: Methods.GET,
    description: 'Get service logs',
    options: { file: path.join(__dirname, '../../request.log') },
    func: utils.getLogs
};