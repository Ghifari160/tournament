import React from "react";
import PropTypes from "prop-types";

import BEM from "../lib/bem.jsx";

class BracketBox extends React.Component
{
    constructor(props)
    {
        super(props);

        let bem = new BEM();
        bem.createBlock(this.props.blockName);
        bem.addBlockModifiers(this.props.blockModifiers);
        bem.createElement("box");
        bem.addElementModifiers(this.props.elementModifiers);

        this.state =
        {
            bem: bem,
            agent: this.props.agent,
            competitor: this.props.competitor,
            score: this.props.score,
            isCompleted: this.props.isCompleted,
            isWinner: this.props.isWinner,
        };
    }

    getClassName()
    {
        if(this.state.isCompleted && this.state.isWinner)
        {
            this.state.bem.removeElementModifier("loser");
            this.state.bem.addElementModifier("winner");
        }
        else if(this.state.isCompleted && !this.state.isWinner)
        {
            this.state.bem.removeElementModifier("winner");
            this.state.bem.addElementModifier("loser");
        }
        else if(!this.state.isCompleted)
        {
            this.state.bem.removeElementModifier("winner");
            this.state.bem.removeElementModifier("loser");
        }

        return this.state.bem.getElementClassName();
    }

    updateScore(score)
    {
        this.setState({ score: score });
    }

    render()
    {
        return <>
            <div className={this.getClassName()}>
                <div className="competitor">{this.state.competitor}</div>
                <div className="score">{this.state.score}</div>
            </div>
        </>;
    }
}

BracketBox.defaultProps =
{
    blockModifiers: [],
    elementModifiers: [],
    score: 0,
    isCompleted: false,
    isWinner: false
};

BracketBox.propTypes =
{
    blockName: PropTypes.string.isRequired,
    blockModifiers: PropTypes.arrayOf(PropTypes.string),
    elementModifiers: PropTypes.arrayOf(PropTypes.string),
    competitor: PropTypes.string.isRequired,
    score: PropTypes.number,
    isCompleted: PropTypes.bool,
    isWinner: PropTypes.bool
};

export default BracketBox;