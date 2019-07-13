import ThemePicker from '../components/ThemePicker';
import themes from '../components/themes';
import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

describe('ThemePicker', () => {
  it('render same number of cards as number of themes', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/themes']}>
        <ThemePicker />
      </MemoryRouter>
    );
    expect(wrapper.find('.card').length).toEqual(themes.length);
  });

  it('render corresponding logo to each themes', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/themes']}>
        <ThemePicker />
      </MemoryRouter>
    );
    const themesIcon = wrapper.find('.theme-icon');
    themesIcon.forEach((icon, index) => {
      const element = document.createElement('span');
      element.innerHTML = themes[index].icon;
      // setting a innerhtml and getting it is mandatory
      // to get exactly the same svg icon
      expect(icon.html()).toContain(element.innerHTML);
    });
  });
});
