#!/usr/bin/env node

const http = require("http"),
      url = require("url"),
      fs = require("fs"),
      mime = require("mime-type/with-db");

const util = require("util");

const color = require("./color.js"),
      dataGenerator = require("./data-generator.js"),
      generator = require("./generator.js"),
      handler = require("./handler.js"),
      { LOG_LEVEL, log, log_request } = require("./log.js"),
      Transform_ReplaceVariables = require("./transform-replace-variables.js"),
      watcher = require("./watcher.js");

const exec_start = new Date();
    
dataGenerator.generate_defaultData();

const configStr = fs.readFileSync("data/config.json", { encoding: "utf8" }),
      packageStr = fs.readFileSync("package.json", { encoding: "utf8" });
    
const package = JSON.parse(packageStr);

let config = JSON.parse(configStr);

config.app =
{
    version: package.version
};

config.api.path = (config.api.path.substring(config.api.path.length - 1) == "/") ? config.api.path.substring(0, config.api.path.length - 1) : config.api.path;
config.admin.path = (config.admin.path.substring(config.admin.path.length - 1) == "/") ? config.admin.path.substring(0, config.admin.path.length - 1) : config.admin.path;
config.public.path = (config.public.path.substring(config.public.path.length - 1) == "/") ? config.public.path.substring(0, config.public.path.length - 1) : config.public.path;

config.rendered = {};

log(LOG_LEVEL.INFO, `URL: ${config.public.url}`);
log(LOG_LEVEL.INFO, `Backend: ${(config.public.enabled) ? "Enabled" : "Disabled"}`);

log(LOG_LEVEL.INFO, `Admin URL: ${config.admin.url}`);
log(LOG_LEVEL.INFO, `Admin Backend: ${(config.admin.enabled) ? "Enabled" : "Disabled"}`);

log(LOG_LEVEL.INFO, `API URL: ${config.api.url}`);
log(LOG_LEVEL.INFO, `API Backend: ${(config.api.enabled) ? "Enabled" : "Disablee"}`);

if(config.server.dev)
{
    log(LOG_LEVEL.WARN, "Server is running on development mode.");

    process.env.NODE_ENV = "development";

    watcher();
}

config.rendered.footer = generator.generate_footer(config);

http.createServer((req, res) =>
{
    handler.handle_routing(config, req, res);
}).listen(config.server.listen_port);

log(LOG_LEVEL.INFO, `Server listening on port ${config.server.listen_port}`);
log(LOG_LEVEL.INFO, `Took ${new Date() - exec_start}ms`);
log(LOG_LEVEL.INFO, `Press Ctrl-C to stop`);