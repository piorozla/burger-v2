import React, { Fragment } from 'react';

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(key => {
    return (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients.key}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>The burger will be ordered with the following ingredients</p>
      <u>{ingredientSummary}</u>
      <p>Continue to Checkout?</p>
    </Fragment>
  );
};

export default OrderSummary;
