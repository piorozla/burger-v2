import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import BurgerBuilder from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder/>', () => {
  let wrapper;
  let state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };
  beforeAll(() => {
    wrapper = shallow(<BurgerBuilder />);
    wrapper.setState(state);
  });
  it('should render <BuildControls/> element', () => {
    expect(wrapper.find(BuildControls)).toHaveLength(1);
    expect(wrapper.find(BuildControls).props()['ingredientAdded']).toEqual(wrapper.instance().addIngredientHandler);
    expect(wrapper.find(BuildControls).props()['ingredientRemoved']).toEqual(
      wrapper.instance().removeIngredientHandler
    );
    expect(wrapper.find(BuildControls).props()['disabled']).toEqual({
      bacon: true,
      cheese: true,
      meat: true,
      salad: true,
    });
    expect(wrapper.find(BuildControls).props()['price']).toEqual(4);
    expect(wrapper.find(BuildControls).props()['purchasable']).toEqual(false);
    expect(wrapper.find(BuildControls).props()['ordered']).toEqual(wrapper.instance().purchaseHandler);
  });
  describe('updatePurchaseState', () => {
    it('should check if any ingredients are present', done => {
      expect(wrapper.instance().updatePurchaseState(state.ingredients)).toEqual(false);
      wrapper.setState({
        ingredients: {
          salad: 1,
        },
      });
      expect(wrapper.instance().updatePurchaseState(state.ingredients)).toEqual(false);
      done();
    });
  });
  describe('addIngredientHandler', () => {
    it('should check if any ingredients are present', done => {
      wrapper.setState(state);
      wrapper.instance().addIngredientHandler('salad');
      expect(wrapper.state('ingredients').salad).toEqual(1);
      expect(wrapper.state('totalPrice')).toEqual(4.5);
      expect(wrapper.state('purchasable')).toEqual(true);
      done();
    });
  });
  describe('addIngredientHandler', () => {
    it('should check if any ingredients are present', done => {
      wrapper.setState({
        ingredients: {
          salad: 1,
        },
      });
      wrapper.instance().removeIngredientHandler('salad');
      expect(wrapper.state('ingredients').salad).toEqual(0);
      expect(wrapper.state('totalPrice')).toEqual(4);
      expect(wrapper.state('purchasable')).toEqual(false);
      done();
    });
  });
  describe('purchaseHandler', () => {
    it('should change purchasing to true', done => {
      wrapper.setState({ purchasing: false });
      wrapper.instance().purchaseHandler();
      expect(wrapper.state('purchasing')).toEqual(true);
      done();
    });
  });
  describe('purchaseCancelHandler', () => {
    it('should change purchasing to false', done => {
      wrapper.setState({ purchasing: true });
      wrapper.instance().purchaseCancelHandler();
      expect(wrapper.state('purchasing')).toEqual(false);
      done();
    });
  });
});
