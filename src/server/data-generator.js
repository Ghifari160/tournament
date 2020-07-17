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