import React from "react";
import PropTypes from "prop-types";

import BEM from "../lib/bem.jsx";

import BracketBox from "./bracket-box.jsx";

class Bracket extends React.Component
{
    constructor(props)
    {
        super(props);

        var bem = new BEM();
        bem.createBlock(this.props.blockName);
        bem.addBlockModifiers(this.props.blockModifiers);

        this.state =
        {
            bem: bem,
            competitor1Name: this.props.competitor1Name,
            competitor1Score: this.props.competitor1Score,
            competitor2Name: this.props.competitor2Name,
            competitor2Score: this.props.competitor2Score,
            isCompleted: this.props.isCompleted
        };
    }

    updateCompetitor1Name(competitor1Name)
    {
        this.setState({ competitor1Name: competitor1Name });
    }

    render()
    {
        return <>
            <BracketBox blockName={this.props.blockName}
                    competitor={this.state.competitor1Name}
                    score={this.state.competitor1Score}
                    isWinner={(this.state.competitor1Score > this.state.competitor2Score)}
                    isCompleted={this.state.isCompleted} />
            <BracketBox blockName={this.props.blockName}
                    competitor={this.state.competitor2Name}
                    score={this.state.competitor2Score}
                    isWinner={(this.state.competitor2Score > this.state.competitor1Score)}
                    isCompleted={this.state.isCompleted} />
        </>;
    }
}

Bracket.defaultProps =
{
    blockModifiers: [],
    competitor1Name: "",
    competitor1Score: 0,
    competitor2Name: "",
    competitor2Score: 0,
    isCompleted: false
};

Bracket.propTypes =
{
    blockName: PropTypes.string.isRequired,
    blockModifiers: PropTypes.arrayOf(PropTypes.string),
    competitor1Name: PropTypes.string,
    competitor1Score: PropTypes.number,
    competitor2Name: PropTypes.string,
    competitor2Score: PropTypes.number,
    isCompleted: PropTypes.bool
};

export default Bracket;