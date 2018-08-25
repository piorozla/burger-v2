import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  let transformedIngredients = Object.keys(props.ingredients).map((ingredient, ingIndex) => 
    [...Array(props.ingredients[ingredient])].map((val, valIndex) => <BurgerIngredient key={ingIndex + ':' + valIndex} type={ingredient} />)
  ).reduce((arr, el)=> {return arr.concat(el)}, []);

  if(transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default Burger;
