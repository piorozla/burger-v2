import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Logo from './Logo';

configure({ adapter: new Adapter() });

describe('<Logo/>', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Logo />);
  });
  it('should render <div /> element', () => {
    expect(wrapper.find('div')).toHaveLength(1);
  });
  it('should render <img /> element', () => {
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('img').props()['src']).toEqual('burger-logo.png');
    expect(wrapper.find('img').props()['alt']).toEqual('BurgerLogo');
  });
});