import * as fs from 'fs';
import * as util from 'util';
import * as crypto from 'crypto';
import * as child_process from 'child_process';

export enum Log_Level {
    log,
    trace,
    info,
    error,
    debug
}

export type Json_Result = {
    error: NodeJS.ErrnoException | null,
    dotNotation: string;
    value: string | number | boolean,
};

export type Logs_Result = {
    error: NodeJS.ErrnoException | null,
    logs: string[];
};

export type Json_Options = {
    file: string,
    dotNotation: string;
};

export type Command_Result = {
    error: child_process.ExecException | null,
    stderr: string,
    stdout: string;
};

export type Command_Options = {
    command: string;
};

export type Command_logs = {
    file: string;
};

// Run a terminal command and return all outputs
export async function run_command(options: Command_Options, conversation_id: string): Promise<Command_Result> {
    return new Promise(resolver => {
        child_process.exec(options.command, (error, stdout, stderr) => {
            const res: Command_Result = {
                error,
                stdout: stdout.replace(/(\r\n|\n|\r)/gm, ""),
                stderr: stderr.replace(/(\r\n|\n|\r)/gm, "")
            };
            resolver(res);
        });
    });
}

export function getPropFromJsonFile(options: Json_Options, conversation_id: string): Promise<Json_Result> {
    return new Promise(resolver => {
        fs.readFile(options.file, (err, data) => {
            const res: Json_Result = {
                dotNotation: options.dotNotation,
                error: err,
                value: data ? JSON.parse(data.toString()).version : ''
            };
            resolver(res);
        });
    });
}

export function getLogs(options: Command_logs, conversation_id: string): Promise<Logs_Result> {
    return new Promise(resolver => {
        fs.readFile(options.file, (err, data) => {
            const res: Logs_Result = {
                error: err,
                logs: data.toString().split('/n')
            };
            resolver(res);
        });
    });
}

export function log(message: string, conversation_id: string, title: string, type: Log_Level): void {

    // Generate the string
    const date = new Date();

    message = `[${date.toISOString()}][${conversation_id}] ${title}: ${message}`;

    // Log the request to the console
    switch (type) {
        case Log_Level.log:
            console.log(util.inspect(message, { colors: true }));
            break;
        case Log_Level.trace:
            console.trace(util.inspect(message, { colors: true }));
            break;
        case Log_Level.info:
            console.info(util.inspect(message, { colors: true }));
            break;
        case Log_Level.error:
            console.error(util.inspect(message, { colors: true }));
            break;
        case Log_Level.debug:
            console.debug(util.inspect(message, { colors: true }));
            break;
        default:
            break;
    }

    // Log the request to a file
    fs.appendFile('request.log', message + '\n', (error) => {
        if (error) {
            console.error(error);
        }
    });
}

// Create a unique id using onlt built in node commands
export function generateId(): string {

    // Get the current high-resolution time
    const time = process.hrtime();

    // Convert the time to a hex string
    const timeHex = time[0].toString(16) + time[1].toString(16);

    // Generate a random bytes
    const randomBytes = crypto.randomBytes(16);

    // Convert the random bytes to a hex string
    const randomHex = randomBytes.toString('hex');

    // Concatenate the time hex and the random hex to create the unique ID
    const id = timeHex + randomHex;

    return id;
}
