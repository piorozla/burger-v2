import React from 'react';

import classes from './Order.css';

const Order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] });
  }

  const ingredientOutput = ingredients
    .filter(ig => ig.amount > 0)
    .map(ig => {
      return (
        <span
          key={ig.name}
          style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px',
          }}
        >
          {ig.name} ({ig.amount})
        </span>
      );
    });

  return (
    <div className={classes.Order}>
      <p>Igredients: {ingredientOutput}</p>
      <p>
        Price: <strong>{Number.parseFloat(props.price).toFixed(2)} USD</strong>
      </p>
    </div>
  );
};

export default Order;
