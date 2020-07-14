import React from "react";
import PropTypes from "prop-types";

import BEM from "../lib/bem.jsx"

class Footer extends React.Component
{
    constructor(props)
    {
        super(props);

        let bem = new BEM();
        bem.createBlock(this.props.blockName);
        bem.addBlockModifiers(this.props.blockModifiers);

        let bem_copyright = new BEM();
        bem_copyright.createBlock(this.props.blockName);
        bem_copyright.addBlockModifiers(this.props.blockModifiers);
        bem_copyright.createElement("copyright");

        let bem_disclaimer = new BEM();
        bem_disclaimer.createBlock(this.props.blockName);
        bem_disclaimer.addBlockModifiers(this.props.blockModifiers);
        bem_disclaimer.createElement("disclaimer");

        let bem_srclink = new BEM();
        bem_srclink.createBlock(this.props.blockName);
        bem_srclink.addBlockModifiers(this.props.blockModifiers);
        bem_srclink.createElement("src-link");

        this.state =
        {
            bem: bem,
            bem_copyright: bem_copyright,
            bem_disclaimer: bem_disclaimer,
            bem_srclink: bem_srclink
        };
    }

    render()
    {
        return <>
            <div className={this.state.bem_copyright.getElementClassName()}>
                &copy; 2020 <a href="https://twitter.com/ghifari160">GHIFARI160</a>. 
                Licensed for use by the New Manhattan.
            </div>

            <div className={this.state.bem_disclaimer.getElementClassName()}>
                Header image created by <a href="https://twitter.com/pumpedupbricks">pumpedupbricks</a>.
            </div>

            <div className={this.state.bem_disclaimer.getElementClassName()}>
                The New Manhattan, <a href="https://twitter.com/senatorderosa">senatorderosa</a>, <a href="https://twitter.com/catthebouncer">catthebouncer</a>, <a href="https://twitter.com/ghifari160">GHIFARI160</a> are in no way affiliated with
                Riot Games, Inc. nor should they be considered endorsed by Riot Games, Inc.
            </div>

            <div className={this.state.bem_disclaimer.getElementClassName()}>
                Riot Games, VALORANT, and any associated logos are trademarks, services marks, and/or 
                registered trademarks of Riot Games, Inc.
            </div>

            <div className={this.state.bem_srclink.getElementClassName()}>
                <a href={this.props.srclink}>Source Code</a>
            </div>
        </>;
    }
}

Footer.defaultProps =
{
    blockModifiers: []
};

Footer.propTypes =
{
    blockName: PropTypes.string.isRequired,
    blockModifiers: PropTypes.arrayOf(PropTypes.string),
    srclink: PropTypes.string.isRequired
};

export default Footer;