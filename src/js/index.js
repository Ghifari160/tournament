import React from "react";
import ReactDOM from "react-dom";

import Header from "./components/header.jsx";
import Navbar from "./components/navbar.jsx";
import NavbarLink from "./components/navbar-link.jsx";
import Footer from "./components/footer.jsx";

import Bracket from "./components/bracket.jsx";
import BracketBox from "./components/bracket-box.jsx";
import Profile from "./components/profile.jsx";

import "../style/index.scss";

let __dom_q = [],
    __domu_q = [];

function dom_enqueue(container, element)
{
    let q =
    {
        container: container,
        element: element
    };

    __dom_q.push(q);
}

function dom_dequeue()
{
    return __dom_q.shift();
}

function dom_renderQueue()
{
    while(__dom_q.length > 0)
    {
        let q = dom_dequeue();

        ReactDOM.render(q.element, q.container);
    }
}

function domu_enqueue(container)
{
    __domu_q.push(container);
}

function domu_dequeue()
{
    return __domu_q.shift();
}

function domu_unmountQueue()
{
    while(__domu_q.length > 0)
        ReactDOM.unmountComponentAtNode(domu_dequeue());
}

function loadJSON(url, callback)
{
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", url, true);
    xobj.onreadystatechange = function()
    {
        if(xobj.readyState == 4 && xobj.status == "200")
            callback(xobj.responseText);
    };
    xobj.send(null);
}

var __bracket = "",
    __competitors = "";

function renderBracket(json)
{
    let bracket = JSON.parse(json);
    let qualifiers = [],
        semifinals = [],
        final = [],
        podium = [];
    
    // Qualifiers
    for(let i = 0; i < bracket.qualifiers.length; i++)
    {
        if(bracket.qualifiers[i].mode == "comp")
        {
            qualifiers.push(<div className={"bracket bracket--q" + i} key={"q" + i}>
                <BracketBox blockName="bracket"
                        competitor={bracket.qualifiers[i].competitor1}
                        score={bracket.qualifiers[i].score1}
                        isWinner={(bracket.qualifiers[i].score1 > bracket.qualifiers[i].score2)}
                        isCompleted={bracket.qualifiers[i].isCompleted} />
                <BracketBox blockName="bracket"
                        competitor={bracket.qualifiers[i].competitor2}
                        score={bracket.qualifiers[i].score2}
                        isWinner={(bracket.qualifiers[i].score2 > bracket.qualifiers[i].score1)}
                        isCompleted={bracket.qualifiers[i].isCompleted} />
            </div>);
        }
        else if(bracket.qualifers[i].mode == "single")
        {
            qualifiers.push(<div className={"bracket bracket--q" + i} key={"q" + i}>
                <BracketBox blockName="bracket"
                        competitor={bracket.qualifiers[i].competitor1}
                        score={bracket.qualifiers[i].score1}
                        isWinner={true}
                        isCompleted={bracket.qualifiers[i].isCompleted} />
            </div>);
        }
    }

    // Semifinals
    for(let i = 0; i < bracket.semifinals.length; i++)
    {
        if(bracket.semifinals[i].mode == "comp")
        {
            semifinals.push(<div className={"bracket bracket--sf" + i} key={"sf" + i}>
                <BracketBox blockName="bracket"
                        competitor={bracket.semifinals[i].competitor1}
                        score={bracket.semifinals[i].score1}
                        isWinner={(bracket.semifinals[i].score1 > bracket.semifinals[i].score2)}
                        isCompleted={bracket.semifinals[i].isCompleted} />
                <BracketBox blockName="bracket"
                        competitor={bracket.semifinals[i].competitor2}
                        score={bracket.semifinals[i].score2}
                        isWinner={(bracket.semifinals[i].score2 > bracket.semifinals[i].score1)}
                        isCompleted={bracket.semifinals[i].isCompleted} />
            </div>);
        }
        else if(bracket.semifinals[i].mode == "single")
        {
            semifinals.push(<div className={"bracket bracket--sf" + i} key={"sf" + i}>
                <BracketBox blockName="bracket"
                        competitor={bracket.semifinals[i].competitor1}
                        score={bracket.semifinals[i].score}
                        isWinner={true}
                        isCompleted={bracket.semifinals[i].isCompleted} />
            </div>);
        }
    }

    // Finals
    for(let i = 0; i < bracket.final.length; i++)
    {
        if(bracket.final[i].mode == "comp")
        {
            final.push(<div className={"bracket bracket--f" + i} key={"f" + i}>
                <BracketBox blockName="bracket"
                        competitor={bracket.final[i].competitor1}
                        score={bracket.final[i].score1}
                        isWinner={(bracket.final[i].score1 > bracket.final[i].score2)}
                        isCompleted={bracket.final[i].isCompleted} />
                <BracketBox blockName="bracket"
                        competitor={bracket.final[i].competitor2}
                        score={bracket.final[i].score2}
                        isWinner={(bracket.final[i].score2 > bracket.final[i].score1)}
                        isCompleted={bracket.final[i].isCompleted} />
            </div>);
        }
        else if(bracket.final[i].mode == "single")
        {
            final.push(<div className={"bracket bracket--f" + i} key={"f" + i}>
                <BracketBox blockName="bracket"
                        competitor={bracket.final[i].competitor1}
                        score={bracket.final[i].score}
                        isWinner={true}
                        isCompleted={bracket.final[i].isCompleted} />
            </div>);
        }
    }

    // Podium
    for(let i = 0; i < bracket.podium.length; i++)
    {
        if(bracket.podium[i].mode == "comp")
        {
            podium.push(<div className={"bracket bracket--p" + i} key={"p" + i}>
                <BracketBox blockName="bracket"
                        competitor={bracket.podium[i].competitor1}
                        score={bracket.podium[i].score1}
                        isWinner={(bracket.podium[i].score1 > bracket.podium[i].score2)}
                        isCompleted={bracket.podium[i].isCompleted} />
                <BracketBox blockName="bracket"
                        competitor={bracket.podium[i].competitor2}
                        score={bracket.podium[i].score2}
                        isWinner={(bracket.podium[i].score2 > bracket.podium[i].score1)}
                        isCompleted={bracket.podium[i].isCompleted} />
            </div>);
        }
        else if(bracket.podium[i].mode == "single")
        {
            podium.push(<div className={"bracket bracket--p" + i} key={"p" + i}>
                <BracketBox blockName="bracket"
                        competitor={bracket.podium[i].competitor1}
                        score={bracket.podium[i].score}
                        isWinner={true}
                        isCompleted={bracket.podium[i].isCompleted} />
            </div>);
        }
    }

    dom_enqueue(document.querySelector(".page--bracket"),
        <>
            <div className="bracket-col bracket-col--qualifiers">
                {qualifiers}
            </div>
            <div className="bracket-col bracket-col--semifinals">
                {semifinals}
            </div>
            <div className="bracket-col bracket-col--final">
                {final}
            </div>
            <div className="bracket-col bracket-col--podium">
                {podium}
            </div>
        </>);

    if(__bracket != json)
    {
        __bracket = json;
        domu_enqueue(document.querySelector(".page--bracket"));
    }
}

function renderCompetitors(json)
{
    let competitors = JSON.parse(json);
    let q = [];

    for(let i = 0; i < competitors.profiles.length; i++)
    {
        q.push(<Profile blockName={"profile"} key={"profile" + competitors.profiles[i].id}
                name={competitors.profiles[i].name}
                tagline={competitors.profiles[i].taglines}
                twitterUsername={competitors.profiles[i].twitter}
                twitchUsername={competitors.profiles[i].twitch} />);
    }

    dom_enqueue(document.querySelector(".page--competitors"),
        <>
            {q}
        </>);

    if(__competitors != json)
    {
        __competitors = json;
        domu_enqueue(document.querySelector(".page--competitors"));
    }
}

function onReady()
{
    let navbar = [];

    navbar.push(<NavbarLink blockName="navbar" key="bracket"
            elementModifiers={(document.querySelector("body").dataset.id == "bracket") ? [ "active" ] : []}
            text="Bracket"
            url="/bracket" />);
    navbar.push(<NavbarLink blockName="navbar" key="competitors"
            elementModifiers={(document.querySelector("body").dataset.id == "competitors") ? [ "active" ] : []}
            text="Competitors"
            url="/competitors" />);
    navbar.push(<NavbarLink blockName="navbar" key="live-stream"
            text="Live Stream"
            url="https://twitch.tv/senatorderosa" />);

    dom_enqueue(document.querySelector(".header"),
        <Header blockName="header" title="The New Manhattan" subtitle="Mod Tournament" />);
    dom_enqueue(document.querySelector(".navbar"),
        <>
            {navbar}
        </>);
    dom_enqueue(document.querySelector(".footer"),
        <Footer blockName="footer" srclink="#" />);

    if(document.querySelector("body").dataset.id == "bracket")
        loadJSON("/bracket.json", renderBracket);
    else if(document.querySelector("body").dataset.id == "competitors")
        loadJSON("/competitors.json", renderCompetitors);

    dom_renderQueue();

    setInterval(function()
    {
        if(document.querySelector("body").dataset.id == "bracket")
            loadJSON("/bracket.json", renderBracket);
        else if(document.querySelector("body").dataset.id == "competitors")
            loadJSON("/competitors.json", renderCompetitors);
    }, 5000);

    setInterval(function()
    {
        domu_unmountQueue();
        dom_renderQueue();
    }, 1000);
}

document.onreadystatechange = function()
{
    if(document.readyState === "complete")
        onReady();
}