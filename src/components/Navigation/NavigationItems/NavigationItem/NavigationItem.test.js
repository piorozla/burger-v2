import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import NavigationItem from './NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItem/>', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<NavigationItem />);
  });
  it('should render <li /> element', () => {
    expect(wrapper.find('li')).toHaveLength(1);
    expect(wrapper.find('li').prop('className')).toEqual(undefined);
  });
  it('should render <a /> element', () => {
    wrapper.setProps({ link: 'url', active: true });
    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('a').prop('className')).toEqual(undefined);
    expect(wrapper.find('a').prop('href')).toEqual('url');
    wrapper.setProps({ link: 'url', active: false });
    expect(wrapper.find('a').prop('className')).toEqual(null);
  });
});
