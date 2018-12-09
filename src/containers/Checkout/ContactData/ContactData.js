import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    eddress: {
      street: '',
      postalCode: '',
    },
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your form data</h4>
        <form action="">
          <input className={classes.Input} type="text" name="name" placeholder="Enter your name" />
          <input  className={classes.Input}type="email" name="email" placeholder="Enter your email" />
          <input  className={classes.Input}type="text" name="street" placeholder="Enter your street" />
          <input  className={classes.Input}type="text" name="postCode" placeholder="Enter your post code" />
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
