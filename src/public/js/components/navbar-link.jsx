import React from "react";
import PropTypes from "prop-types";

import BEM from "../lib/bem.jsx";

class NavbarLink extends React.Component
{
    constructor(props)
    {
        super(props);

        let bem = new BEM();
        bem.createBlock(this.props.blockName);
        bem.addBlockModifiers(this.props.blockModifiers);
        bem.createElement("link");
        bem.addElementModifiers(this.props.elementModifiers);

        this.link_clickHandler = this.link_clickHandler.bind(this);

        this.state =
        {
            bem: bem,
            externalLink: this.props.externalLink
        };
    }

    link_clickHandler(event)
    {
        if(!this.state.externalLink)
        {
            this.props.pageLoader(this.props.pageId);

            event.preventDefault();
        }
        else
            console.log("Link is external");
    }

    render_innerElement()
    {

        if(this.props.url.length > 0)
            return <a href={this.props.url} onClick={this.link_clickHandler}>{this.props.text}</a>;
        else
            return this.props.text;
    }

    render()
    {
        if(this.props.active)
            this.state.bem.addElementModifier("active");
        else
            this.state.bem.removeElementModifier("active");

        return <>
            <div className={this.state.bem.getElementClassName()}>
                {this.render_innerElement()}
            </div>
        </>;
    }
}

NavbarLink.defaultProps =
{
    blockModifiers: [],
    elementModifiers: [],
    url: "",
    externalLink: false,
    pageLoader: function(){ window.location.href = this.props.url }.bind(this),
    active: false
};

NavbarLink.propTypes =
{
    blockName: PropTypes.string.isRequired,
    blockModifiers: PropTypes.arrayOf(PropTypes.string),
    elementModifiers: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
    externalLink: PropTypes.bool,
    pageLoader: PropTypes.func,
    active: PropTypes.bool,
    pageId: PropTypes.string.isRequired
};

export default NavbarLink;