import * as path from 'path';
import * as utils from '../utils';
import { Route, Methods } from './route_shared';

export const route: Route = {
    path: '/version',
    method: Methods.GET,
    description: 'Get service version',
    options: { dotNotation: 'version', file: path.join(__dirname, '../../package.json') },
    func: utils.getPropFromJsonFile
};