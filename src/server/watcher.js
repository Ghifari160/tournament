const fs = require("fs"),
      child_process = require("child_process");
    
const { LOG_LEVEL, log } = require("./log.js");

const pathToWatch = [
    "src/public/js/components",
    "src/public/js/lib",
    "src/public/js",
    "src/public/style",
    "src/public"
];

const webpack_path = "node_modules/.bin/webpack";
const webpack_dev_args = "--mode development";

function __webpack_build(exec_start = new Date())
{
    child_process.exec(`${webpack_path} ${webpack_dev_args}`, { cwd: process.cwd() }, (e, stdout, stderr) =>
    {
        if(e)
        {
            log(LOG_LEVEL.SEVERE, "Unable to execute Webpack build");
            log(LOG_LEVEL.SEVERE, e);
        }
        else
            log(LOG_LEVEL.INFO, `Webpack bundle built in ${new Date() - exec_start}ms`);
    });
}

function __watch(path)
{
    fs.watch(path, (event, filename) =>
    {
        if(filename)
        {
            log(LOG_LEVEL.INFO, `${filename} changed. Rebuilding Webpack bundle...`);
            __webpack_build();
        }
    });
}

function watch()
{
    for(let i = 0; i < pathToWatch.length; i++)
        __watch(pathToWatch[i]);
    
    log(LOG_LEVEL.INFO, `Watching ${pathToWatch.length} directories`);
}

module.exports = watch;