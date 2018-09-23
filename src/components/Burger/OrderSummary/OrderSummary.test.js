import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Button from '../../UI/Button/Button';
import OrderSummary from './OrderSummary';

configure({ adapter: new Adapter() });

describe('<OrderSummary/>', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<OrderSummary ingredients={{ apples: 0 }} price={0} />);
  });
  // it('should render <BurgerIngredient /> elements', () => {
  //   wrapper.setProps({ ingredients: { apples: 5 } });
  //   expect(wrapper.find(BurgerIngredient)).toHaveLength(7);
  //   expect(
  //     wrapper
  //       .find(BurgerIngredient)
  //       .at(0)
  //       .props()['type']
  //   ).toEqual('bread-top');
  //   expect(
  //     wrapper
  //       .find(BurgerIngredient)
  //       .at(6)
  //       .props()['type']
  //   ).toEqual('bread-bottom');
  // });
  it('should render <h3 /> element', () => {
    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.find('Fragment').contains(<h3>Your Order</h3>)).toBeTruthy();
  });
  it('should render <p /> elements', () => {
    const fargment = wrapper.find('Fragment');
    expect(fargment.contains(<p>The burger will be ordered with the following ingredients</p>)).toBeTruthy();
    expect(
      fargment.contains(
        <p>
          <strong>Total price: 0.00</strong>
        </p>
      )
    ).toBeTruthy();
    expect(fargment.contains(<p>Continue to Checkout?</p>)).toBeTruthy();
  });
  it('should render <ul /> element', () => {
    expect(wrapper.find('ul')).toHaveLength(1);
  });
  it('should render <li /> element', () => {
    wrapper.setProps({ ingredients: { apples: 5, tomatos: 3 } });
    expect(wrapper.find('li')).toHaveLength(2);
    expect(
      wrapper
        .find('li')
        .at(0)
        .html()
    ).toContain('apples');
    expect(
      wrapper
        .find('li')
        .at(0)
        .html()
    ).toContain(5);
  });
  it('should render <Button /> elements', () => {
    wrapper.setProps({ purchaseContinued: 'purchaseContinued', purchaseCanceled: 'purchaseCanceled' });
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(
      wrapper
        .find(Button)
        .at(0)
        .props()['btnType']
    ).toEqual('Success');
    expect(
      wrapper
        .find(Button)
        .at(0)
        .props()['clicked']
    ).toEqual('purchaseContinued');
    expect(
      wrapper
        .find(Button)
        .at(0)
        .html()
    ).toContain('CONTINUE');
    expect(
      wrapper
        .find(Button)
        .at(1)
        .props()['btnType']
    ).toEqual('Danger');
    expect(
      wrapper
        .find(Button)
        .at(1)
        .props()['clicked']
    ).toEqual('purchaseCanceled');
    expect(
      wrapper
        .find(Button)
        .at(1)
        .html()
    ).toContain('CANCEL');
  });
});
