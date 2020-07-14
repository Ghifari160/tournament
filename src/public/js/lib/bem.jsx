import { array } from "prop-types";

/**
 * Block Element Modifier (BEM) methodology
 */
class BEM
{
  constructor()
  {
    this.blockName = null;
    this.blockModifier = [];
    this.elementName = null;
    this.elementModifier = [];
  }

  /**
   * Creates BEM block
   * @param {string} blockName       Block name
   * @param {string} [blockModifier] Initial block modifier
   */
  createBlock(blockName, blockModifier)
  {
    this.blockName = blockName;
    
    if(blockModifier != null)
      this.addBlockModifier(blockModifier);
  }

  /**
   * Adds modifier to block
   * @param {string} blockModifier Modifier to add
   */
  addBlockModifier(blockModifier)
  {
    this.blockModifier.push(blockModifier);
  }

  /**
   * Add modifiers to block
   * @param {string[]} blockModifiers Array of modifiers to add
   */
  addBlockModifiers(blockModifiers)
  {
    for(var i = 0; i < blockModifiers.length; i++)
      this.blockModifier.push(blockModifiers[i]);
  }

  /**
   * Creates BEM element
   * @param {string} elementName       Element name
   * @param {string} [elementModifier] Initial element modifier
   */
  createElement(elementName, elementModifier)
  {
    this.elementName = elementName;

    if(elementModifier != null)
      this.addElementModifier(elementModifier);
  }

  /**
   * Adds modifier to element
   * @param {string} elementModifier Modifier to add
   */
  addElementModifier(elementModifier)
  {
    this.elementModifier.push(elementModifier);
  }

  /**
   * Add modifiers to element
   * @param {string[]} elementModifiers Array of modifiers to add
   */
  addElementModifiers(elementModifiers)
  {
    for(var i = 0; i < elementModifiers.length; i++)
      this.elementModifier.push(elementModifiers[i]);
  }

  removeElementModifier(elementModifer)
  {
    let index = this.elementModifier.indexOf(elementModifer);
    if(index > -1)
      this.elementModifier.splice(index, 1);
  }

  /**
   * Gets BEM block CSS class name
   * @return {string} CSS class name
   */
  getBlockClassName()
  {
    var className = this.blockName;

    for(var i = 0; i < this.blockModifier.length; i++)
      className += ` ${this.blockName}--${this.blockModifier[i]}`;

    return className;
  }

  /**
   * Gets BEM elemenbt CSS class name
   * @return {string} CSS class name
   */
  getElementClassName()
  {
    var className = this.blockName + "__" + this.elementName;

    for(var i = 0; i < this.elementModifier.length; i++)
      className += ` ${this.blockName}__${this.elementName}--${this.elementModifier[i]}`;
      
    return className;
  }
}

export default BEM;