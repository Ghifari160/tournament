const fs = require("fs"),
      child_process = require("child_process");
    
const { LOG_LEVEL, log } = require("./log.js");

const pathToWatch = [
    "src/admin",
    "src/public",
    "src/common"
];

const webpack = "npm run dev:webpack";

function __webpack_build(exec_start = new Date())
{
    child_process.exec(`${webpack}`, { cwd: process.cwd() }, (e, stdout, stderr) =>
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

function __scan(path)
{
    let pathsToWatch = [],
        pathsToScan = [];

    if(fs.lstatSync(path).isDirectory())
        pathsToScan = fs.readdirSync(path);

    for(let i = 0; i < pathsToScan.length; i++)
    {
        if(`${path}/${pathsToScan[i]}`.match(/node_modules/g) == null && fs.lstatSync(`${path}/${pathsToScan[i]}`).isDirectory())
            pathsToWatch = pathsToWatch.concat(__scan(`${path}/${pathsToScan[i]}`));
    }

    pathsToWatch.push(path);

    return pathsToWatch;
}

function watch()
{
    let pathsToWatch = [];

    for(let i = 0; i < pathToWatch.length; i++)
        pathsToWatch = pathsToWatch.concat(__scan(pathToWatch[i]));

    for(let i = 0; i < pathsToWatch.length; i++)
        __watch(pathsToWatch[i]);
    
    log(LOG_LEVEL.INFO, `Watching ${pathsToWatch.length} directories`);

    __webpack_build();
}

module.exports = watch;