import React from "react";
import PropTypes from "prop-types";

import BEM from "../lib/bem.jsx";

class BracketBoxPlaceholder extends React.Component
{
    constructor(props)
    {
        super(props);

        let bem = new BEM();
        bem.createBlock(this.props.blockName);
        bem.addBlockModifiers(this.props.blockModifiers);
        bem.addElementModifier("placeholder");
        
        bem.createElement("box");
        bem.addElementModifiers(this.props.elementModifiers);

        this.state =
        {
            bem: bem
        };
    }

    render()
    {
        return <>
            <div className={this.state.bem.getElementClassName()}>
                <div className="competitor"></div>
                <div className="score"></div>
            </div>
        </>;
    }
}

BracketBoxPlaceholder.defaultProps =
{
    blockModifiers: [],
    elementModifiers: []
};

BracketBoxPlaceholder.propTypes =
{
    blockName: PropTypes.string.isRequired,
    blockModifiers: PropTypes.arrayOf(PropTypes.string),
    elementModifiers: PropTypes.arrayOf(PropTypes.string)
};

export default BracketBoxPlaceholder;