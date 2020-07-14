import React from "react";
import PropTypes from "prop-types";

import BEM from "../lib/bem.jsx";

class Header extends React.Component
{
    constructor(props)
    {
        super(props);

        let bem = new BEM();
        bem.createBlock(this.props.blockName);
        bem.addBlockModifiers(this.props.blockModifiers);

        let bem_cover = new BEM();
        bem_cover.createBlock(this.props.blockName);
        bem_cover.addBlockModifiers(this.props.blockModifiers);
        bem_cover.createElement("cover");

        let bem_title = new BEM();
        bem_title.createBlock(this.props.blockName);
        bem_title.addBlockModifiers(this.props.blockModifiers);
        bem_title.createElement("title");

        let bem_subtitle = new BEM();
        bem_subtitle.createBlock(this.props.blockName);
        bem_subtitle.addBlockModifiers(this.props.blockModifiers);
        bem_subtitle.createElement("subtitle");

        this.state =
        {
            bem: bem,
            bem_cover: bem_cover,
            bem_title: bem_title,
            bem_subtitle: bem_subtitle
        };
    }

    render()
    {
        return <>
            <div className={this.state.bem_title.getElementClassName()}>{this.props.title}</div>
            <div className={this.state.bem_subtitle.getElementClassName()}>{this.props.subtitle}</div>
            <div className={this.state.bem_cover.getElementClassName()}>
                <img src="/assets/images/header.jpg" />
            </div>
        </>;
    }
}

Header.defaultProps =
{
    blockModifiers: []
};

Header.propTypes =
{
    blockName: PropTypes.string.isRequired,
    blockModifiers: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    subtitle: PropTypes.string
};

export default Header;