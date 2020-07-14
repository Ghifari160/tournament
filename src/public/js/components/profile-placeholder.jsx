import React from "react";
import PropTypes from "prop-types";

import BEM from "../lib/bem.jsx";

class ProfilePlaceholder extends React.Component
{
    constructor(props)
    {
        super(props);

        let bem = new BEM();
        bem.createBlock(this.props.blockName);
        bem.addBlockModifiers(this.props.blockModifiers);
        bem.addBlockModifier("placeholder");

        let bem_name = new BEM();
        bem_name.createBlock(this.props.blockName);
        bem_name.addBlockModifiers(this.props.blockModifiers);
        bem_name.createElement("name");

        let bem_tagline = new BEM();
        bem_tagline.createBlock(this.props.blockName);
        bem_tagline.addBlockModifiers(this.props.blockModifiers);
        bem_tagline.createElement("tagline");

        let bem_socials = new BEM();
        bem_socials.createBlock(this.props.blockName);
        bem_socials.addBlockModifiers(this.props.blockModifiers);
        bem_socials.createElement("socials");

        let bem_socials_twitter = new BEM();
        bem_socials_twitter.createBlock(this.props.blockName);
        bem_socials_twitter.addBlockModifiers(this.props.blockModifiers);
        bem_socials_twitter.createElement("socials");
        bem_socials_twitter.addElementModifier("twitter");

        let bem_socials_twitch = new BEM();
        bem_socials_twitch.createBlock(this.props.blockName);
        bem_socials_twitch.addBlockModifiers(this.props.blockModifiers);
        bem_socials_twitch.createElement("socials");
        bem_socials_twitch.addElementModifier("twitch");

        this.state =
        {
            bem: bem,
            bem_name: bem_name,
            bem_tagline: bem_tagline,
            bem_socials: bem_socials,
            bem_socials_twitter: bem_socials_twitter,
            bem_socials_twitch: bem_socials_twitch
        };
    }

    render()
    {
        return <>
            <section className={this.state.bem.getBlockClassName()}>
                <div className={this.state.bem_name.getElementClassName()}></div>
                <div className={this.state.bem_tagline.getElementClassName()}></div>
                <div className={this.state.bem_socials_twitter.getElementClassName()}></div>
                <div className={this.state.bem_socials_twitch.getElementClassName()}></div>
            </section>
        </>;
    }
}

ProfilePlaceholder.defaultProps =
{
    blockModifiers: []
};

ProfilePlaceholder.propTypes =
{
    blockName: PropTypes.string.isRequired,
    blockModifiers: PropTypes.arrayOf(PropTypes.string)
};

export default ProfilePlaceholder;