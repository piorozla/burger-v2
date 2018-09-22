import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Burger from './Burger';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

configure({ adapter: new Adapter() });

describe('<Burger/>', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Burger ingredients={{ apples: 0 }} />);
  });
  it('should render <BurgerIngredient /> elements', () => {
    wrapper.setProps({ ingredients: { apples: 5 } });
    expect(wrapper.find(BurgerIngredient)).toHaveLength(7);
    expect(
      wrapper
        .find(BurgerIngredient)
        .at(0)
        .props()['type']
    ).toEqual('bread-top');
    expect(
      wrapper
        .find(BurgerIngredient)
        .at(6)
        .props()['type']
    ).toEqual('bread-bottom');
  });
  it('should render <p /> element if no ingredients', () => {
    wrapper.setProps({ ingredients: { apples: 0 } });
    expect(wrapper.find(BurgerIngredient)).toHaveLength(2);
    expect(wrapper.find('div').contains(<p>Please start adding ingredients!</p>)).toBeTruthy();
  });
});
