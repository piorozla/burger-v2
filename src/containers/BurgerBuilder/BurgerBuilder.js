import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionTypes from '../../store/actions/actionTypes';

class BurgerBuilder extends Component {
  state = {
    purchasing: false, // states if the customer clicked on ORDER NOW button and is currently in the process of purchasing
    loading: false, // display spinner helper
    ingradientsFetchError: false, // display error when ingredients fetch failed
  };

  componentDidMount() {
    // axios
    //   .get('/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(err => this.setState({ ingradientsFetchError: true }));
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => sum + el);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.ingradientsFetchError ? <p>Failed to load ingredients!</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: ingName => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
