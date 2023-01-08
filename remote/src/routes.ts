import * as utils from './utils';
import * as path from 'path';

// import of routes
import { Route } from './routes/route_shared';
import * as shutdown from './routes/shutdown';
import * as shutdown_cancel from './routes/shutdown_cancel';
import * as df from './routes/df';
import * as hostname from './routes/hostname';
import * as logs from './routes/logs';
import * as uptime from './routes/uptime';
import * as version from './routes/version';

export const routes: Route[] = [
    shutdown.route,
    shutdown_cancel.route,
    df.route,
    hostname.route,
    logs.route,
    uptime.route,
    version.route
];