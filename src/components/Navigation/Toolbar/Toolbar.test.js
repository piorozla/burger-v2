import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Toolbar from './Toolbar';

configure({ adapter: new Adapter() });

describe('<Toolbar/>', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Toolbar />);
  });
  it('should render <header /> element', () => {
    expect(wrapper.find('header')).toHaveLength(1);
    expect(wrapper.find('header').props()['className']).toEqual(undefined);
  });
  it('should render <DrawerToggle /> element', () => {
    wrapper.setProps({ drawerToggleClicked: 'drawerToggleClicked' });
    expect(wrapper.find(DrawerToggle)).toHaveLength(1);
    expect(wrapper.find(DrawerToggle).props()['clicked']).toEqual('drawerToggleClicked');
  });
  it('should render <div /> element', () => {
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').children()).toHaveLength(1);
    expect(wrapper.find('div').props()['className']).toEqual(undefined);
  });
  it('should render <Logo /> element', () => {
    expect(wrapper.find(Logo)).toHaveLength(1);
  });
  it('should render <nav /> element', () => {
    expect(wrapper.find('nav')).toHaveLength(1);
    expect(wrapper.find('nav').children()).toHaveLength(1);
    expect(wrapper.find('nav').props()['className']).toEqual(undefined);
  });
  it('should render <NavigationItems /> element', () => {
    expect(wrapper.find(NavigationItems)).toHaveLength(1);
  });
});
