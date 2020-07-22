// import stream from "stream";
// import util from "util";

const stream = require("stream"),
      util = require("util");

class Transform_ReplaceVariables
{
    constructor(pageId, config, options)
    {
        if(!(this instanceof Transform_ReplaceVariables))
            return new Transform_ReplaceVariables(pageId, config, options);
        
        stream.Transform.call(this, options);

        this.pageId = pageId;
        this.config = config;
    }

    _transform(chunk, enc, cb)
    {
        let c = chunk.toString();
        c = c.replace(/\$\{REQUEST\.PATH\}/g, this.pageId);
        
        c = c.replace(/\$\{CONFIG\.APIURL\}/g, this.config.api.url);

        c = c.replace(/\$\{NAVBAR\.DATA\}/g, `window.__navbar = ${JSON.stringify(this.config.navbar)};`);
        
        c = c.replace(/\$\{TOURNAMENT\.FULLNAME\}/g, `${this.config.tournament.organization.name} ${this.config.tournament.name}`);
        c = c.replace(/\$\{TOURNAMENT\.NAME\}/g, this.config.tournament.name);

        if(this.config.tournament.hasOwnProperty("cover"))
            c = c.replace(/\$\{TOURNAMENT\.COVER\}/g, this.config.tournament.cover);
        else
            c = c.replace(/\$\{TOURNAMENT\.COVER\}/g, "/assets/images/header.jpg");
            
        c = c.replace(/\$\{TOURNAMENT\.ORGANIZATION\.NAME\}/g, this.config.tournament.organization.name);

        c = c.replace(/\$\{FOOTER\}/g, this.config.rendered.footer);

        this.push(c);
        cb();
    }
}
util.inherits(Transform_ReplaceVariables, stream.Transform);

module.exports = Transform_ReplaceVariables;