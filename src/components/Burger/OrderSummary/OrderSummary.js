import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(key => {
    return (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>The burger will be ordered with the following ingredients</p>
      <ul>{ingredientSummary}</ul>  
      <p>Continue to Checkout?</p>
      <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
      <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
    </Fragment>
  );
};

export default OrderSummary;
