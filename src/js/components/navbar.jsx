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
            bem: bem
        };
    }

    render()
    {
        return <>
            <NavbarLink blockName={this.props.blockName} blockModifiers={this.props.blockModifiers} elementModifiers={[ "active" ]} text="Bracket" url="/bracket" />
            <NavbarLink blockName={this.props.blockName} blockModifiers={this.props.blockModifiers} text="Competitors" url="/competitors" />
            <NavbarLink blockName={this.props.blockName} blockModifiers={this.props.blockModifiers} text="Live Stream" />
        </>;
    }
}

Navbar.defaultProps =
{
    blockModifiers: []
};

Navbar.propTypes =
{
    blockName: PropTypes.string.isRequired,
    blockModifiers: PropTypes.arrayOf(PropTypes.string)
};

export default Navbar;