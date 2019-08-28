import React from 'react';

import { createShallow } from '@material-ui/core/test-utils';
import SectionProfile from '../../components/SectionProfile';

const setup = props => {
  const shallow = createShallow({ dive: true });
  const wrapper = shallow(<SectionProfile />);
  return wrapper;
};

describe('Access to props', () => {
  it('should have access to the profile prop', () => {
    const wrapper = setup({
      text: 'Wtf!',
      profile: {
        firstName: 'Test',
        lastName: 'Testman',
        fullName: 'Test Testman',
        paragraph: 'I am Test Testman and I love to test all kinds of things.',
        title: 'My resume'
      }
    });
  });

  it('should have access to the photo prop', () => {});
});

describe('Rendering components', () => {
  it('should render ContactDetails', () => {});

  it('should render Portrait', () => {});

  it('should render Portrait', () => {});
});
