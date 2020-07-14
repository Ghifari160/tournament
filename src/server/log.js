const COLOR = require("./color.js");

const LOG_LEVEL =
{
    INFO: `${COLOR.FGCYAN}INFO${COLOR.RESET}`,
    WARN: `${COLOR.FGYELLOW}WARN${COLOR.RESET}`,
    SEVERE: `${COLOR.FGRED}SEVERE${COLOR.RESET}`
};

function __getTimestamp(date)
{
    let timestamp = "";

    timestamp += `${date.getUTCFullYear()}-`;
    timestamp += (date.getUTCMonth() < 10) ? `0${date.getUTCMonth()}-` : `${date.getUTCMonth()}-`;
    timestamp += (date.getUTCDate() < 10) ? `0${date.getUTCDate()} ` : `${date.getUTCDate()} `;

    timestamp += (date.getUTCHours() < 10) ? `0${date.getUTCHours()}:` : `${date.getUTCHours()}:`;
    timestamp += (date.getUTCMinutes() < 10) ? `0${date.getUTCMinutes()}:` : `${date.getUTCMinutes()}:`;
    timestamp += (date.getUTCSeconds() < 10) ? `0${date.getUTCSeconds()}` : `${date.getUTCSeconds()}`;

    return timestamp;
}

function log(level, message)
{
    process.stdout.write(`[${__getTimestamp(new Date())}] ${level} ${message}\n`);
}

function __formatHttpCode(code)
{
    switch(code)
    {
        case 200:
            code = `${COLOR.FGGREEN}${code}${COLOR.RESET}`;
            break;
        
        default:
            code = `${COLOR.FGRED}${code}${COLOR.RESET}`;
    }

    return code;
}

function log_request(level, method, path, code, exec_start, exec_end = new Date())
{
    log(level, `"${method.toUpperCase()} ${path}" ${__formatHttpCode(code)} ${exec_end - exec_start}ms`);
}

module.exports =
{
    LOG_LEVEL: LOG_LEVEL,
    log: log,
    log_request: log_request
};