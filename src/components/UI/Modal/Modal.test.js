import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Modal from './Modal';
import Backdrop from '../Backdrop/Backdrop';

configure({ adapter: new Adapter() });

describe('<Modal/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Modal />);
  });
  it('should render <Backdrop/> element', () => {
    expect(wrapper.find(Backdrop)).toHaveLength(1);
  });
  it('should render <Backdrop/> element with props', () => {
    wrapper.setProps({ show: 'show', modalClosed: 'modalClosed', children: 'children' });
    expect(wrapper.find(Backdrop)).toHaveLength(1);
    expect(wrapper.find(Backdrop).props()['show']).toEqual('show');
    expect(wrapper.find(Backdrop).props()['clicked']).toEqual('modalClosed');
  });
  it('should render <div/> element with attributes', () => {
    wrapper.setProps({ show: 'show', children: ['child1', 'child2'] });
    expect(wrapper.find('div').children()).toHaveLength(2);
    expect(wrapper.find('div').prop('className')).toEqual(undefined);
    expect(wrapper.find('div').prop('style')).toBeTruthy();
  });
});
