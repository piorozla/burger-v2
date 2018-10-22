import React, { Component, Fragment } from 'react';

import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false, // states if the order can be purchased => at least 1 ingredient added
    purchasing: false, // states if the customer clicked on ORDER NOW button and is currently in the process of purchasing
    loading: false, // display spinner helper
    ingradientsFetchError: false, // display error when ingredients fetch failed
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(err => this.setState({ ingradientsFetchError: true }));
  }

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
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Piotr Rozlal',
        address: {
          street: 'Teststreet 1',
          postCode: 'YO17FD',
          country: 'United Kingdom',
        },
        email: 'example@test.com',
      },
      deliveryMethod: 'Deliveroo',
    };
    axios
      .post('/orders.json', order)
      .then(res => this.setState({ loading: false, purchasing: false }))
      .catch(err => this.setState({ loading: false, purchasing: false }));
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.ingradientsFetchError ? <p>Failed to load ingredients!</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Fragment>
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
