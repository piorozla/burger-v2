import React from 'react';

import classes from './Order.css';

const Order = (props) => (
  <div className={classes.Order}>
    <p>Igredients: Salad (1)</p>
    <p>Price: <strong>5.45 USD</strong></p>
  </div>
);

export default Order;