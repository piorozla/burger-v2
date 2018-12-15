import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    eddress: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
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
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form action="">
        <Input inputtype="input" type="text" name="name" placeholder="Enter your name" />
        <Input inputtype="input" type="email" name="email" placeholder="Enter your email" />
        <Input inputtype="input" type="text" name="street" placeholder="Enter your street" />
        <Input inputtype="input" type="text" name="postCode" placeholder="Enter your post code" />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your form data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
