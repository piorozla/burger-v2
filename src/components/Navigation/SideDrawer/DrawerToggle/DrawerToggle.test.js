import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import DrawerToggle from './DrawerToggle';

configure({ adapter: new Adapter() });

describe('<DrawerToggle/>', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<DrawerToggle />);
  });
  it('should render 5 <div /> elements', () => {
    expect(wrapper.find('div')).toHaveLength(4);
  });
  it('should render <div /> element', () => {
    wrapper.setProps({ clicked: 'clicked'});
    expect(wrapper.find('div').at(0).props()['onClick']).toEqual('clicked')
  });
});
