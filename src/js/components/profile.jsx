import React from "react";
import PropTypes from "prop-types";

import BEM from "../lib/bem.jsx";

class Profile extends React.Component
{
    constructor(props)
    {
        super(props);

        let bem = new BEM();
        bem.createBlock(this.props.blockName);
        bem.addBlockModifiers(this.props.blockModifiers);

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

    getSocial_Twitter()
    {
        if(this.props.twitterUsername.length > 0)
        {
            return <>
                <div className="logo">
                    <img src="/assets/images/icon-twitter.svg" alt="https://twitter.com" />
                </div>
                <div className="text">
                    <a href={"https://twitter.com/" + this.props.twitterUsername}>/{this.props.twitterUsername}</a>
                </div>
            </>;
        }
        else
            return "";
    }

    getSocial_Twitch()
    {
        if(this.props.twitchUsername.length > 0)
        {
            return <>
                <div className="logo">
                    <img src="/assets/images/icon-twitch.svg" alt="https://twitch.tv" />
                </div>
                <div className="text">
                    <a href={"https://twitch.tv/" + this.props.twitchUsername}>/{this.props.twitchUsername}</a>
                </div>
            </>;
        }
        else
            return "";
    }

    render()
    {
        return <>
            <section className={this.state.bem.getBlockClassName()}>
                <div className={this.state.bem_name.getElementClassName()}>{this.props.name}</div>
                <div className={this.state.bem_tagline.getElementClassName()}>{this.props.tagline}</div>
                <div className={this.state.bem_socials_twitter.getElementClassName()}>{this.getSocial_Twitter()}</div>
                <div className={this.state.bem_socials_twitch.getElementClassName()}>{this.getSocial_Twitch()}</div>
            </section>
        </>;
    }
}

Profile.defaultProps =
{
    blockModifiers: [],
    twitterUsername: "",
    twitchUsername: ""
};

Profile.propTypes =
{
    blockName: PropTypes.string.isRequired,
    blockModifiers: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    twitterUsername: PropTypes.string,
    twitchUsername: PropTypes.string
};

export default Profile;