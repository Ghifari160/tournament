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

function generate_navbar(config_navbar)
{
    let navbar = "",
        exec_start = new Date();
    
    log(LOG_LEVEL.INFO, "Generating navbar...");

    for(let i = 0; i < config_navbar.links.length; i++)
    {
        let t = `<div class="navbar__link${(i == 0) ? " navbar__link--active" : ""}">`
              + `<a href="${config_navbar.links[i].url}" onclick="loadPage_bracket();">${config_navbar.links[i].text}</a>`
              + `</div>`;
            
        navbar += t;
    }

    log(LOG_LEVEL.INFO, `Navbar generated in ${new Date() - exec_start}ms`);

    return navbar;
}

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
    generate_navbar: generate_navbar,
    generate_footer: generate_footer
};