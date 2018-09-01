import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
    purchasable: false,
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => sum + el);

    return sum > 0;
  }

  addIngredientHandler = type => {
    this.setState(prevState => {
      const newState = {
        ingredients: {
          ...prevState.ingredients,
        },
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
      };

      newState.ingredients[type] += 1;
      newState.purchasable = this.updatePurchaseState(newState.ingredients);
      return newState;
    });
  };

  removeIngredientHandler = type => {
    this.setState(prevState => {
      const newState = {
        ingredients: {
          ...prevState.ingredients,
        },
        totalPrice: prevState.totalPrice,
      };
      if (prevState.ingredients[type] > 0) {
        newState.ingredients[type] -= 1;
        newState.totalPrice -= INGREDIENT_PRICES[type];
        newState.purchasable = this.updatePurchaseState(newState.ingredients);
      }

      return newState;
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Fragment>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
