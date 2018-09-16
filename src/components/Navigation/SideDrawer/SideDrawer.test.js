import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawer from './SideDrawer';

configure({ adapter: new Adapter() });

describe('<SideDrawer/>', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<SideDrawer />);
  });
  it('should render <Backdrop /> element', () => {
    wrapper.setProps({ open: true, closed: 'closed' });
    expect(wrapper.find(Backdrop)).toHaveLength(1);
    expect(wrapper.find(Backdrop).props()['show']).toEqual(true);
    expect(wrapper.find(Backdrop).props()['clicked']).toEqual('closed');
  });
  it('should render <div /> element', () => {
    expect(wrapper.find('div')).toHaveLength(2);
  });
  it('should render <Logo /> element', () => {
    expect(wrapper.find(Logo)).toHaveLength(1);
  });
  it('should render <nav /> element', () => {
    expect(wrapper.find('nav')).toHaveLength(1);
    expect(wrapper.find('nav').children()).toHaveLength(1);
  });
  it('should render <NavigationItems /> element', () => {
    expect(wrapper.find(NavigationItems)).toHaveLength(1);
  });
});
