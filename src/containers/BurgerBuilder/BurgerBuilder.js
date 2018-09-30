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
    purchasable: false, // states if the order can be purchased => at least 1 ingredient added
    purchasing: false, // states if the customer clicked on ORDER NOW button and is currently in the process of purchasing
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

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // console.log('continue');
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
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
