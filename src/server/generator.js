const marked = require("marked");

const { LOG_LEVEL, log } = require("./log.js");

const marked_renderer =
{
    paragraph(text)
    {
        return `${text}`;
    }
};

marked.use(
{
    gfm: true,
    renderer: marked_renderer
});

function generate_footer(config)
{
    let footer = "",
        exec_start = new Date();
    
    log(LOG_LEVEL.INFO, "Generating footer...");

    footer += `<div class="footer__copyright">${marked(config.footer.copyright)}</div>`;
    
    for(let i = 0; i < config.footer.extra.length; i++)
        footer += `<div class="footer__disclaimer${i}">${marked(config.footer.extra[i])}</div>`;
    
    footer += `<div class="footer__powered">${marked(`Powered by [UP-2020062401](https://github.com/Ghifari160/tournament) v${config.app.version}`)}</div>`;

    log(LOG_LEVEL.INFO, `Footer generated in ${new Date() - exec_start}ms`);

    return footer;
}

module.exports =
{
    marked_renderer: marked_renderer,
    generate_footer: generate_footer
};