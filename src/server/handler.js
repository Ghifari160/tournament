const fs = require("fs"),
      mime = require("mime-type/with-db"),
      stream = require("stream");
    
const { LOG_LEVEL, log, log_request } = require("./log.js"),
      Transform_ReplaceVariables = require("./transform-replace-variables.js");

function __handle_fileReq(path, pageId, config, req, res, exec_start, cacheControl = 300)
{
    fs.stat(path, (err, stat) =>
    {
        if(err && err.code === "ENOENT")
        {
            res.writeHead(404);
            res.write("404 Not Found.");
            res.end();

            log_request(LOG_LEVEL.INFO, req.method, req.url, 404, exec_start);
        }
        else if(err)
        {
            res.writeHead(500);
            res.write("500 Internal Server Error.");
            res.end();

            log_request(LOG_LEVEL.INFO, req.method, req.url, 500, exec_start);
        }
        else
        {
            let replaceVariables = false;
            res.writeHead(200,
            {
                "Content-Type": mime.lookup(path),
                "Cache-Control": cacheControl
            });

            switch(mime.lookup(path))
            {
                case "text/html":
                case "text/plain":
                case "application/json":
                    replaceVariables = true;
                    break;
                
                default:
                    replaceVariables - false;
            }

            if(replaceVariables)
            {
                stream.pipeline(
                    fs.createReadStream(path),
                    new Transform_ReplaceVariables(pageId, config),
                    res,
                    (err) =>
                {
                    if(err)
                    {
                        log_request(LOG_LEVEL.INFO, req.method, req.url, 500, exec_start);
                        log(LOG_LEVEL.WARN, err);
                    }
                    else
                    {
                        log_request(LOG_LEVEL.INFO, req.method, req.url, 200, exec_start);
                    }
                });
            }
            else
            {
                stream.pipeline(
                    fs.createReadStream(path),
                    res,
                    (err) =>
                {
                    if(err)
                    {
                        log_request(LOG_LEVEL.INFO, req.method, req.url, 500, exec_start);
                        log(LOG_LEVEL.WARN, err);
                    }
                    else
                        log_request(LOG_LEVEL.INFO, req.method, req.url, 200, exec_start);
                });
            }
        }
    });
}

function handle_api(path, config, req, res, exec_start)
{
    let success = true;

    switch(path)
    {
        case `${config.api.path}/bracket`:
            __handle_fileReq("data/bracket.json", "api/bracket", config, req, res, exec_start, 150);
            break;
        
        case `${config.api.path}/competitors`:
            __handle_fileReq("data/competitors.json", "api/competitors", config, req, res, exec_start, 150);
            break;

        default:
            success = false;
    }

    return success;
}

function handle_public(path, config, req, res, exec_start)
{
    let success = true;

    switch(path)
    {
        case `${(config.public.path == "") ? "/" : config.public.path}`:
        case `${config.public.path}/bracket`:
            __handle_fileReq(`${config.server.doc_root}/public/index.html`, "bracket", config, req, res, exec_start);
            break;
        
        case `${config.public.path}/competitors`:
            __handle_fileReq(`${config.server.doc_root}/public/index.html`, "competitors", config, req, res, exec_start);
            break;
        
        default:
            success = false;
    }

    return success;
}

function handle_default(path, config, req, res, exec_start)
{
    let regex = RegExp(/^\/assets\/(.*)/g);

    if(regex.test(path))
        __handle_fileReq(`${config.server.doc_root}/common${path}`, path, config, req, res, exec_start);
    else
        __handle_fileReq(`${config.server.doc_root}${path}`, path, config, req, res, exec_start);
}

function handle_routing(config, req, res)
{
    let exec_start = new Date();

    switch(req.url)
    {
        case `${config.public.path}`:
        case `${config.public.path}/bracket`:
        case `${config.public.path}/competitors`:
            if(config.public.enabled && handle_public(req.url, config, req, res, exec_start))
                break;
        
        case `${config.api.path}/bracket`:
        case `${config.api.path}/competitors`:
            if(config.api.enabled && handle_api(req.url, config, req, res, exec_start))
                break;

        default:
            handle_default(req.url, config, req, res, exec_start);
            break;
    }
}

module.exports =
{
    handle_routing: handle_routing
};