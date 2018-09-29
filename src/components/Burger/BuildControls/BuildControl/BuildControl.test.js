import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import BuildControl from './BuildControl';

configure({ adapter: new Adapter() });

describe('<BuildControl/>', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<BuildControl />);
  });
  it('should render a div with label', () => {
    wrapper.setProps({ label: 'label' });
    expect(wrapper.find('div')).toHaveLength(2);
    expect(
      wrapper
        .find('div')
        .at(0)
        .contains(<div>label</div>)
    ).toBeTruthy();
  });
  it('should render 2 buttons', () => {
    wrapper.setProps({ added: 'added', removed: 'removed', disabled: true });
    expect(wrapper.find('button')).toHaveLength(2);
    expect(
      wrapper
        .find('button')
        .at(0)
        .props()['onClick']
    ).toEqual('removed');
    expect(
      wrapper
        .find('button')
        .at(0)
        .props()['disabled']
    ).toEqual(true);
    expect(
      wrapper
        .find('button')
        .at(1)
        .props()['onClick']
    ).toEqual('added');
  });
});
