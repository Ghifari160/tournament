import React from "react";
import ReactDOM from "react-dom";

import Navbar from "./components/navbar.jsx";

import BracketBox from "./components/bracket-box.jsx";
import BracketBoxPlaceholder from "./components/bracket-box-placehoder.jsx";

import Profile from "./components/profile.jsx";
import ProfilePlaceholder from "./components/profile-placeholder.jsx";

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

let __bracket = "",
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
                        score={bracket.semifinals[i].score1}
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
                        score={bracket.final[i].score1}
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
                        score={bracket.podium[i].score1}
                        isWinner={true}
                        isCompleted={bracket.podium[i].isCompleted} />
            </div>);
        }
    }

    if(__bracket != json)
    {
        __bracket = json;
        domu_enqueue(document.querySelector(".page--bracket"));

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
    }
}

function renderBracket__Placeholder(num = 4)
{
    // let q, sf, f, p = [];
    let q = [],
        sf = [],
        f = [],
        p = [];

    // Qualifiers
    for(let i = 0; i < num; i++)
    {
        q.push(<div className={"bracket bracket--q-" + i} key={"q-" + i}>
            <BracketBoxPlaceholder blockName="bracket" />
            <BracketBoxPlaceholder blockName="bracket" />
        </div>);
    }

    // Semifinals
    for(let i = 0; i < (num / 2); i++)
    {
        sf.push(<div className={"bracket bracket--sf-" + i} key={"sf-" + i}>
            <BracketBoxPlaceholder blockName="bracket" />
            <BracketBoxPlaceholder blockName="bracket" />
        </div>);
    }

    // Finals
    for(let i = 0; i < (num / 4); i++)
    {
        f.push(<div className={"bracket bracket--f-" + i} key={"f-" + i}>
            <BracketBoxPlaceholder blockName="bracket" />
            <BracketBoxPlaceholder blockName="bracket" />
        </div>);
    }

    // Podiums
    for(let i = 0; i < (num / 4); i++)
    {
        p.push(<div className={"bracket bracket--p-" + i} key={"p-" + i}>
            <BracketBoxPlaceholder blockName="bracket" />
        </div>);
    }

    dom_enqueue(document.querySelector(".page--bracket"),
        <>
            <div className="bracket-col bracket-col--qualifiers">
                {q}
            </div>
            <div className="bracket-col bracket-col--semifinals">
                {sf}
            </div>
            <div className="bracket-col bracket-col--final">
                {f}
            </div>
            <div className="bracket-col bracket-col--podium">
                {p}
            </div>
        </>);
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

    if(__competitors != json)
    {
        __competitors = json;
        domu_enqueue(document.querySelector(".page--competitors"));
        dom_enqueue(document.querySelector(".page--competitors"),
        <>
            {q}
        </>);
    }
}

function renderCompetitors__Placeholder(num = 6)
{
    let q = [];

    for(let i = 0; i < num; i++)
        q.push(<ProfilePlaceholder blockName={"profile"} key={"profile-placeholder-" + i} />);
    
    dom_enqueue(document.querySelector(".page--competitors"),
        <>
            {q}
        </>);
}

function loadPage_bracket(replaceState = false)
{
    __bracket = "";

    document.querySelector("body").dataset.id = "bracket";

    document.querySelector(".page").classList.remove("page--competitors");
    document.querySelector(".page").classList.add("page--bracket");
    
    renderBracket__Placeholder();
    dom_renderQueue();

    loadJSON(`${__apiUrl}/bracket`, renderBracket);

    __navbar.current.setState({ activeId: "bracket" });

    if(!replaceState)
        window.history.pushState({ pageId: "bracket" }, "", "/bracket");
    else
        window.history.replaceState({ pageId: "bracket"}, "", "/bracket");
}

function loadPage_competitors(replaceState = false)
{
    __competitors = "";

    document.querySelector("body").dataset.id = "competitors";
    
    document.querySelector(".page").classList.remove("page--bracket");
    document.querySelector(".page").classList.add("page--competitors");
    
    renderCompetitors__Placeholder();
    dom_renderQueue();

    loadJSON(`${__apiUrl}/competitors`, renderCompetitors);
    
    __navbar.current.setState({ activeId: "competitors" });
    
    if(!replaceState)
        window.history.pushState({ pageId: "competitors" }, "", "/competitors");
    else
        window.history.replaceState({ pageId: "competitors"}, "", "/competitors");
}

function loadPage(id, replaceState = false)
{
    switch(id)
    {
        case "bracket":
            loadPage_bracket(replaceState);
            break;

        case "competitors":
            loadPage_competitors(replaceState);
            break;
        
        default:
            console.error(`Invalid page id: ${id}`);
    }
}

let __apiUrl, __navbar;

function onReady()
{
    __apiUrl = document.querySelector("body").dataset.apiurl;
    __apiUrl = (__apiUrl.substring(__apiUrl.length - 1) == "/") ? __apiUrl.substring(0, __apiUrl.length - 1) : __apiUrl;

    __navbar = React.createRef();

    dom_enqueue(document.querySelector(".navbar"), <Navbar ref={__navbar} blockName="navbar" config={window.__navbar} pageLoader={loadPage} />);

    window.addEventListener("popstate", (event) =>
    {
        loadPage(event.state.pageId, true);
    });

    if(document.querySelector("body").dataset.id == "bracket")
        loadPage_bracket(true);
    else if(document.querySelector("body").dataset.id == "competitors")
        loadPage_competitors(true);

    setInterval(function()
    {
        if(document.querySelector("body").dataset.id == "bracket")
            loadJSON(`${__apiUrl}/bracket`, renderBracket);
        else if(document.querySelector("body").dataset.id == "competitors")
            loadJSON(`${__apiUrl}/competitors`, renderCompetitors);
    }, 60000);

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