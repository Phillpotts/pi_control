// Module imports
import * as dotenv from 'dotenv';
import * as http from 'http';
import * as url from 'url';
// Local imports
import * as utils from './utils';
import { routes } from './routes';
import { Methods } from './routes/route_shared';
import { AddressInfo } from 'net';

// Get environment varibles
dotenv.config();

// Varibales
const PORT = process.env.PI_CONTROL_PORT || 3000;
const API_KEY = process.env.PI_CONTROL_API_KEY || '1234567';

const app = http.createServer((req, res) => {

    // Get Unique ID for request
    const conversation_id = utils.generateId();

    // Parse the request URL
    const parsedUrl = url.parse(req.url || '');

    // Get the pathname
    const pathname = parsedUrl.pathname;

    // Set the response header to indicate that the body is a JSON object
    res.setHeader('Content-Type', 'application/json');

    // Check if the API key is valid
    if (req.headers['x-api-key'] !== API_KEY) {
        // Return an error if the API key is invalid
        res.statusCode = 401;
        res.end(JSON.stringify({ message: 'Unauthorized' }));
    }

    // Find matching route for call
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const method = (req.method || 'GET') as Methods;
        if (route.path === req.url && route.method == method) {
            route.func(route.options, conversation_id).then(command_result => {
                if (command_result.error)
                    res.statusCode = 500;
                res.end(JSON.stringify(command_result));
            });
        }
    }

    utils.log(`(${res.statusCode}) ${pathname}`, conversation_id, 'SERVER', utils.Log_Level.info);

}).listen(PORT, () => {
    utils.log(`Running on http://${(app.address() as AddressInfo).address}:${(app.address() as AddressInfo).port}`, 'N/A', 'SERVER', utils.Log_Level.info);
});
