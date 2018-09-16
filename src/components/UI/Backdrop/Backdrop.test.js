import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import Backdrop from './Backdrop';

configure({ adapter: new Adapter() });

describe('<Backdrop/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Backdrop />);
  });
  it('should render <div /> element when props.show', () => {
    wrapper.setProps({ show: true, clicked: 'clicked' });
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').props()['onClick']).toEqual('clicked');
    expect(wrapper.find('div').props()['className']).toEqual(undefined);
  });
  it('should not render <div /> element when not props.show', () => {
    wrapper.setProps({ show: false });
    expect(wrapper.find('div')).toHaveLength(0);
  });
});
