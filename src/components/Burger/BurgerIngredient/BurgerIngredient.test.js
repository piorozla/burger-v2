import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import BurgerIngredient from './BurgerIngredient';

configure({ adapter: new Adapter() });

describe('<BurgerIngredient/>', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<BurgerIngredient type="not-valid" />);
  });
  it('should render nothing if there is no valid type prop', () => {
    wrapper.setProps({ type: 'not-valid' });
    expect(wrapper.find('div')).toHaveLength(0);
  });
  it('should render 3 divs if type is bread-top', () => {
    wrapper.setProps({ type: 'bread-top' });
    expect(wrapper.find('div')).toHaveLength(3);
  });
  ['bread-bottom', 'meat', 'cheese', 'salad', 'bacon'].forEach(type => {
    it('should render 3 divs if type is bread-top', () => {
      wrapper.setProps({ type });
      expect(wrapper.find('div')).toHaveLength(1);
    });
  });
});
