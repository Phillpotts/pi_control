import * as utils from '../utils';

export type route_func = {
    (options: any, conversation_id: string): Promise<utils.Command_Result | utils.Json_Result | utils.Logs_Result>;
};

export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    PUT = 'PUT'
}

export type Route = {
    path: string,
    method: Methods;
    description: string,
    func: route_func,
    options: utils.Command_Options | utils.Json_Options | utils.Command_logs;
};