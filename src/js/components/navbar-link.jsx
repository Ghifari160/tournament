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

        this.state =
        {
            bem: bem
        };
    }

    render_innerElement()
    {
        if(this.props.url.length > 0)
            return <a href={this.props.url}>{this.props.text}</a>;
        else
            return this.props.text;
    }

    render()
    {
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
    externalLink: false
};

NavbarLink.propTypes =
{
    blockName: PropTypes.string.isRequired,
    blockModifiers: PropTypes.arrayOf(PropTypes.string),
    elementModifiers: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
    externalLink: PropTypes.bool
};

export default NavbarLink;