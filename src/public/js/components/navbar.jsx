import React from "react";
import PropTypes from "prop-types";

import BEM from "../lib/bem.jsx";

import NavbarLink from "./navbar-link.jsx";

class Navbar extends React.Component
{
    constructor(props)
    {
        super(props);

        let bem = new BEM();
        bem.createBlock(this.props.blockName);
        bem.addBlockModifiers(this.props.blockModifiers);

        this.state =
        {
            bem: bem,
            activeId: this.props.activeId
        };
    }

    test(e)
    {
        console.log(e);
    }

    render()
    {
        let links = [];

        for(let i = 0; i < this.props.config.links.length; i++)
        {
            links.push(<NavbarLink key={`nav-${i}`}
                    pageId={this.props.config.links[i].id}
                    blockName={this.props.blockName}
                    blockModifiers={this.props.blockModifiers}
                    text={this.props.config.links[i].text}
                    url={this.props.config.links[i].url}
                    externalLink={this.props.config.links[i].external}
                    active={(this.state.activeId == this.props.config.links[i].id)}
                    pageLoader={this.props.pageLoader} />);
        }

        return <>
            {links}
        </>;
    }
}

Navbar.defaultProps =
{
    blockModifiers: [],
    pageLoader: function() {}.bind(this)
};

Navbar.propTypes =
{
    blockName: PropTypes.string.isRequired,
    blockModifiers: PropTypes.arrayOf(PropTypes.string),
    config: PropTypes.object.isRequired,
    activeId: PropTypes.string,
    pageLoader: PropTypes.func
};

export default Navbar;