import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Layout from './Layout';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

configure({ adapter: new Adapter() });

describe('<Layout/>', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<Layout />);
  });
  it('should render <SideDrawer /> element', () => {
    wrapper.setState({ showSideDrawer: false });
    expect(wrapper.find(SideDrawer)).toHaveLength(1);
    expect(wrapper.find(SideDrawer).props()['closed']).toEqual(
      wrapper.instance().sideDrawerClosedHandler
    );
    expect(wrapper.find(SideDrawer).props()['open']).toEqual(false);
  });
  it('should render <Toolbar /> element', () => {
    expect(wrapper.find(Toolbar)).toHaveLength(1);
    expect(wrapper.find(Toolbar).props()['drawerToggleClicked']).toEqual(
      wrapper.instance().sideDrawerToggleHandler
    );
  });
  it('should render <main /> element', () => {
    expect(wrapper.find('main')).toHaveLength(1);
    expect(wrapper.find('main').prop('className')).toEqual(undefined);
  });
  describe('sideDrawerToggleHandler', () => {
    it('should toggle state', () => {
      wrapper.setState({ showSideDrawer: false });
      wrapper.instance().sideDrawerToggleHandler();
      expect(wrapper.state()['showSideDrawer']).toEqual(true);
      wrapper.instance().sideDrawerToggleHandler();
      expect(wrapper.state()['showSideDrawer']).toEqual(false);
    });
  });
  describe('sideDrawerClosedHandler', () => {
    it('should set showSideDrawer prop to false', () => {
      wrapper.setState({ showSideDrawer: true });
      wrapper.instance().sideDrawerClosedHandler();
      expect(wrapper.state()['showSideDrawer']).toEqual(false);
      wrapper.instance().sideDrawerClosedHandler();
      expect(wrapper.state()['showSideDrawer']).toEqual(false);
    });
  });
});
