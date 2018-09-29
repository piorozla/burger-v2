import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import App from './App';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

configure({ adapter: new Adapter() });

describe('<App/>', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<App />);
  });
  it('should render <Layout/> element', () => {
    expect(wrapper.find(Layout)).toHaveLength(1);
  });
  it('should render <BurgerBuilder/> element', () => {
    expect(wrapper.find(BurgerBuilder)).toHaveLength(1);
  });
});
