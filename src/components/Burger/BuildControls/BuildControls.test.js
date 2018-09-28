import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import BuildControls from './BuildControls';
import BuildControl from './BuildControl/BuildControl';
import { doesNotReject } from 'assert';

configure({ adapter: new Adapter() });

describe('<BuildControls/>', () => {
  let wrapper;
  const disabledInfo = {
    salad: true,
    bacon: false,
    cheese: false,
    meat: false,
  };
  beforeAll(() => {
    wrapper = shallow(
      <BuildControls
        ingredientAdded={el => el}
        ingredientRemoved={el => el}
        disabled={disabledInfo}
        price={3}
        purchasable={true}
        ordered={'ordered'}
      />
    );
  });
  it('should render a div', () => {
    wrapper.setProps({ price: 3 });
    expect(wrapper.find('div')).toHaveLength(1);
  });
  it('should render a p with price', () => {
    expect(wrapper.find('p')).toHaveLength(1);
    expect(
      wrapper.find('p').contains(
        <p>
          Current Price: <strong>3.00</strong>
        </p>
      )
    ).toBeTruthy();
  });
  it('should render 4 BuildControls', () => {
    expect(wrapper.find(BuildControl)).toHaveLength(4);
    expect(
      wrapper
        .find(BuildControl)
        .at(0)
        .props()['label']
    ).toEqual('Salad');
    expect(
      wrapper
        .find(BuildControl)
        .at(0)
        .props()
        ['added']()
    ).toEqual('salad');
    expect(
      wrapper
        .find(BuildControl)
        .at(0)
        .props()
        ['removed']()
    ).toEqual('salad');
    expect(
      wrapper
        .find(BuildControl)
        .at(0)
        .props()['disabled']
    ).toEqual(true);
  });
  it('should render a button', () => {
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.find('button').props()['disabled']).toEqual(false);
    expect(wrapper.find('button').props()['onClick']).toEqual('ordered');
    expect(wrapper.find('button').html()).toEqual('<button>ORDER NOW</button>');
  });
});
