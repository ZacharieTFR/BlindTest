import GuesserDisplay from '../components/GuesserDisplay';
import Timer from '../components/Timer';

import React from 'react';
import { mount } from 'enzyme';
import { Route, MemoryRouter } from 'react-router-dom';
import themes from '../components/themes';

const theme = themes[0];
const wrapper = mount(
  <MemoryRouter initialEntries={['/themes/' + theme.id]}>
    <Route
      path="/themes/:themeId"
      component={props => <GuesserDisplay {...props} />}
    />
  </MemoryRouter>
);
describe('GuesserDisplay', () => {
  it('render correctly and corresponding theme', () => {
    const componentTitle = wrapper.find('h1').text();
    expect(componentTitle).toMatch(theme.id);
  });

  it('render Timer when quiz is started', () => {
    const startQuizButton = wrapper.find('.startBlindTest-btn').first();
    startQuizButton.simulate('click');
    expect(wrapper.find(Timer));
  });
});
