import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
  };
  addIngredientHandler = type => {
    this.setState(prevState => {
      const newState = {
        ingredients: {
          ...prevState.ingredients,
        },
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
      };

      newState.ingredients[type] = prevState.ingredients[type] + 1;
      return newState;
    });
  };

  removeIngredientHandler = type => {
    this.setState(prevState => {
      const newState = {
        ingredients: {
          ...prevState.ingredients,
        },
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
      };
      if (prevState.ingredients[type] > 0) {
        newState.ingredients[type] -= 1;
        newState.totalPrice -= INGREDIENT_PRICES[type];
      }

      return newState;
    });
  };

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
