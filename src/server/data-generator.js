const fs = require("fs"),
      semver = require("semver");

const { LOG_LEVEL, log } = require("./log.js");

const default_bracket =
{
    version: "1",
    qualifiers: [
        {
            mode: "comp",
            competitor1: "Competitor 1",
            competitor2: "Competitor 2",
            score1: 4,
            score2: 13,
            isCompleted: true
        },
        {
            mode: "comp",
            competitor1: "Competitor 3",
            competitor2: "Competitor 4",
            score1: 13,
            score2: 3,
            isCompleted: true
        },
        {
            mode: "comp",
            competitor1: "Competitor 5",
            competitor2: "Competitor 6",
            score1: 5,
            score2: 13,
            isCompleted: true
        },
        {
            mode: "comp",
            competitor1: "Competitor 7",
            competitor2: "Competitor 8",
            score1: 12,
            score2: 13,
            isCompleted: true
        }
    ],
    semifinals: [
        {
            mode: "comp",
            competitor1: "Competitor 2",
            competitor2: "Competitor 3",
            score1: 12,
            score2: 13,
            isCompleted: true
        },
        {
            mode: "comp",
            competitor1: "Competitor 6",
            competitor2: "Competitor 8",
            score1: 13,
            score2: 10,
            isCompleted: true
        }
    ],
    final: [
        {
            mode: "comp",
            competitor1: "Competitor 3",
            competitor2: "Competitor 8",
            score1: 0,
            score2: 0,
            isCompleted: false
        }
    ],
    podium: [
        {
            mode: "single",
            competitor1: "Winner",
            score1: 0,
            isCompleted: false
        }
    ]
};

const default_competitors =
{
    version: "1",
    profiles: [
        {
            id: "comp1",
            name: "Competitor 1",
            taglines: "Taglines",
            twitter: "username",
            twitch: "username"
        },
        {
            id: "comp2",
            name: "Competitor 2",
            taglines: "Taglines",
            twitter: "username",
            twitch: "username"
        },
        {
            id: "comp3",
            name: "Competitor 3",
            taglines: "Taglines",
            twitter: "username",
            twitch: "username"
        },
        {
            id: "comp4",
            name: "Competitor 4",
            taglines: "Taglines",
            twitter: "username",
            twitch: "username"
        },
        {
            id: "comp5",
            name: "Competitor 5",
            taglines: "Taglines",
            twitter: "username",
            twitch: "username"
        },
        {
            id: "comp6",
            name: "Competitor 6",
            taglines: "Taglines",
            twitter: "username",
            twitch: "username"
        },
        {
            id: "comp7",
            name: "Competitor 7",
            taglines: "Taglines",
            twitter: "username",
            twitch: "username"
        },
        {
            id: "comp8",
            name: "Competitor 8",
            taglines: "Taglines",
            twitter: "username",
            twitch: "username"
        }
    ]
};

function __directoryExists()
{
    return fs.existsSync("data");
}

function __configExists()
{
    return fs.existsSync("data/config.json");
}

function __configExists_atOldLocation()
{
    return fs.existsSync("config.json");
}

function __bracketExists()
{
    return fs.existsSync("data/bracket.json");
}

function __competitorsExist()
{
    return fs.existsSync("data/competitors.json");
}

function __write_defaultConfig()
{
    fs.writeFileSync("data/config.json", __sanitizeConfigString());
}

function __write_defaultBracket()
{
    fs.writeFileSync("data/bracket.json", JSON.stringify(default_bracket, null, 4));
}

function __write_defaultCompetitors()
{
    fs.writeFileSync("data/competitors.json", JSON.stringify(default_competitors, null, 4));
}

function __move_configToNewLocation()
{
    log(LOG_LEVEL.WARN, "Moving config.json to data/config.json");
    fs.renameSync("config.json", "data/config.json");
}

function __symlink_oldConfigLocation()
{
    log(LOG_LEVEL.WARN, "Creating symlink data/config.json => config.json for backwards compatibility");
    fs.symlinkSync("data/config.json", "config.json");
}

function __sanitizeConfigObj_version(config)
{
    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.hasOwnProperty("version") || semver.satisfies(config.version, "<0.3.1"))
        config.version = "0.3.1";
}

function __sanitizeConfigObj_serverModule(config, moduleId)
{
    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.hasOwnProperty(moduleId))
        config[moduleId] = {};

    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config[moduleId].hasOwnProperty("enabled"))
        config[moduleId].enabled = true;

    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config[moduleId].hasOwnProperty("path"))
        config[moduleId].path = (moduleId == "public") ? `/` : `/${moduleId}`;

    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config[moduleId].hasOwnProperty("url"))
        config[moduleId].url = `http://localhost:8080${(moduleId == "public") ? `/` : `/${moduleId}`}`;
}

function __sanitizeConfigObj_server(config)
{
    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.hasOwnProperty("server"))
        config.server = {};
    
    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.server.hasOwnProperty("dev"))
        config.server.dev = false;
    
    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.server.hasOwnProperty("listen_port"))
        config.server.listen_port = "8080";

    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/925e26f2f10a3567dfb43fc9385a5337ca57f8b0
    if(!config.server.hasOwnProperty("doc_root"))
        config.server.doc_root = "./dist";
}

function __sanitizeConfigObj_tournament(config)
{
    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.hasOwnProperty("tournament"))
        config.tournament = {};

    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.tournament.hasOwnProperty("organization"))
        config.tournament.organization = {};

    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.tournament.organization.hasOwnProperty("name"))
        config.tournament.organization.name = "Organization";
    
    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.tournament.hasOwnProperty("name"))
        config.tournament.name = "Tournament";

    // Released: v0.3.0
    // Commit: https://github.com/Ghifari160/tournament/commit/a109bb6871d95df407899b58280440ad2a35686e
    if(!config.tournament.hasOwnProperty("cover"))
        config.tournament.cover = "/assets/images/header.jpg";
}

function __sanitizeConfigObj_navbar(config)
{
    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.hasOwnProperty("navbar"))
        config.navbar = {};

    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.navbar.hasOwnProperty("primary"))
        config.navbar.primary = "bracket";
    
    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.navbar.hasOwnProperty("links"))
    {
        config.navbar.links = [
            {
                id: "bracket",
                text: "Bracket",
                url: "/bracket",
                external: false
            },
            {
                id: "competitors",
                text: "Competitors",
                url: "/competitors",
                external: false
            }
        ];
    }
    else
    {
        for(let i = 0; i < config.navbar.links.length; i++)
        {
            if(!config.navbar.links[i].hasOwnProperty("id"))
                config.navbar.links[i].id = `navbar-link-${i}`;
            
            if(!config.navbar.links[i].hasOwnProperty("text"))
                config.navbar.links[i].text = `Navbar Link ${i}`;

            if(!config.navbar.links[i].hasOwnProperty("url"))
                config.navbar.links[i].url = "";

            if(!config.navbar.links[i].hasOwnProperty("external"))
                config.navbar.links[i].external = false;
        }
    }
}

function __sanitizeConfigObj_footer(config)
{
    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.hasOwnProperty("footer"))
        config.footer = {};
    
    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.footer.hasOwnProperty("copyright"))
        config.footer.copyright = "&copy; 2020 [Organization](http://localhost:8080)";

    // Released: v0.2.0
    // Commit: https://github.com/Ghifari160/tournament/commit/d51ba45da701ef1598b5ad3f99b55c8cbeeb8ef3
    if(!config.footer.hasOwnProperty("extra"))
        config.footer.extra = [];
}

function __sanitizeConfigString(configStr = "{}")
{
    let config = JSON.parse(configStr);

    __sanitizeConfigObj_version(config);
    
    __sanitizeConfigObj_serverModule(config, "api");
    __sanitizeConfigObj_serverModule(config, "admin");
    __sanitizeConfigObj_serverModule(config, "public");

    __sanitizeConfigObj_server(config);

    __sanitizeConfigObj_tournament(config);

    __sanitizeConfigObj_navbar(config);

    __sanitizeConfigObj_footer(config);

    return JSON.stringify(config, null, 4);
}

function __sanitizeConfig()
{
    let configStr = fs.readFileSync("data/config.json", { encoding: "utf8" });

    configStr = __sanitizeConfigString(configStr);

    fs.writeFileSync("data/config.json", configStr);
}

function generate_defaultData()
{
    let exec_start = new Date(),
        count = 0;

    if(!__directoryExists())
    {
        fs.mkdirSync("data");
        count++;
    }

    if(__configExists_atOldLocation())
    {
        log(LOG_LEVEL.WARN, "config.json found at root directory. This will not be supported in future updates");

        if(!fs.lstatSync("config.json").isSymbolicLink())
        {
            __move_configToNewLocation();
            __symlink_oldConfigLocation();
            count++;
        }
    }
    else if(!__configExists())
    {
        __write_defaultConfig();
        count++;
    }
    else
        __sanitizeConfig();
    
    if(!__bracketExists())
    {
        __write_defaultBracket();
        count++;
    }
    
    if(!__competitorsExist())
    {
        __write_defaultCompetitors();
        count++;
    }
    
    if(count > 0)
        log(LOG_LEVEL.INFO, `Default data generated in ${new Date() - exec_start}ms`);
}

module.exports =
{
    generate_defaultData: generate_defaultData
};