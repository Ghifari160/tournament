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
    
const configStr = fs.readFileSync("config.json", { encoding: "utf8" }),
      packageStr = fs.readFileSync("package.json", { encoding: "utf8" });
    
const package = JSON.parse(packageStr);

let config = JSON.parse(configStr);

config.app =
{
    version: package.version
};

config.api.path = (config.api.path == "/") ? "" : config.api.path;
config.admin.path = (config.admin.path == "/") ? "" : config.admin.path;
config.public.path = (config.public.path == "/") ? "" : config.public.path;

config.rendered = {};

log(LOG_LEVEL.INFO, `URL: ${config.public.url}`);
log(LOG_LEVEL.INFO, `Backend: ${(config.public.enabled) ? "Enabled" : "Disabled"}`);

log(LOG_LEVEL.INFO, `Admin URL: ${config.admin.url}`);
log(LOG_LEVEL.INFO, `Admin Backend: ${(config.admin.enabled) ? "Enabled" : "Disabled"}`);

log(LOG_LEVEL.INFO, `API URL: ${config.api.url}`);
log(LOG_LEVEL.INFO, `API Backend: ${(config.api.enabled) ? "Enabled" : "Disablee"}`);

if(config.server.dev)
{
    log(LOG_LEVEL.INFO, "Development mode.");

    watcher();
}

dataGenerator.generate_defaultData();

config.rendered.footer = generator.generate_footer(config);

http.createServer((req, res) =>
{
    handler.handle_routing(config, req, res);
}).listen(config.server.listen_port);

log(LOG_LEVEL.INFO, `Server listening on port ${config.server.listen_port}`);
log(LOG_LEVEL.INFO, `Took ${new Date() - exec_start}ms`);
log(LOG_LEVEL.INFO, `Press Ctrl-C to stop`);