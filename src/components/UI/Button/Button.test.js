import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Button from './Button';

configure({ adapter: new Adapter() });

describe('<Button/>', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Button/>);
  });
  it('should render <button/> element', () => {
    expect(wrapper.find('button')).toHaveLength(1);
  });
  it('should render <button/> element with props', () => {
    wrapper.setProps({ clicked: 'clicked', children: ['child1', 'child2'] });
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.find('button').props()['className']).toEqual(' ');
    expect(wrapper.find('button').props()['onClick']).toEqual('clicked');
    expect(wrapper.find('button').children()).toHaveLength(2);
  });
});
