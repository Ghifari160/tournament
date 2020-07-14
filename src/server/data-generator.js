const fs = require("fs");

const { LOG_LEVEL, log } = require("./log.js");

const default_bracket =
{
    version: "1",
    qualifiers: [
        {
            mode: "comp",
            competitor1: "Competitor 1",
            competitor2: "Competitor 2",
            score1: 11,
            score2: 13,
            isCompleted: true
        }
    ],
    semifinals: [
        {
            mode: "comp",
            competitor1: "Competitor 1",
            competitor2: "Competitor 2",
            score1: 13,
            score2: 11,
            isCompleted: true
        }
    ],
    final: [
        {
            mode: "comp",
            competitor1: "Competitor 1",
            competitor2: "Competitor 2",
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
        }
    ]
};

function __directoryExists()
{
    return fs.existsSync("data");
}

function __bracketExists()
{
    return fs.existsSync("data/bracket.json");
}

function __competitorsExist()
{
    return fs.existsSync("data/competitors.json");
}

function __write_defaultBracket()
{
    fs.writeFileSync("data/bracket.json", JSON.stringify(default_bracket, null, 4));
}

function __write_defaultCompetitors()
{
    fs.writeFileSync("data/competitors.json", JSON.stringify(default_competitors, null, 4));
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
        log(LOG_LEVEL.INFO, `Default data genereted in ${new Date() - exec_start}ms`);
}

module.exports =
{
    generate_defaultData: generate_defaultData
};