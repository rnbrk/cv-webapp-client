import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import checkPropTypes from 'check-prop-types';

import SectionProfile from '../../components/SectionProfile';
import AboutMe from '../../components/AboutMe';
import ContactDetails from '../../components/ContactDetails';
import Portrait from '../../components/Portrait';

const userId = '123456789abc';
const profile = {
  cvs: [
    {
      title: 'CV file 1',
      user: userId,
      _id: '1'
    },

    {
      title: 'CV file 2',
      user: userId,
      _id: '2'
    }
  ],
  dateOfBirth: '2000-01-01T00:00.00Z',
  email: 'test@test.com',
  firstName: 'Test',
  lastName: 'Testman',
  fullName: 'Test Testman',
  profession: 'Web app tester',
  phoneNumber: '1234567890',
  paragraph:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et ligula ullamcorper malesuada proin libero.',
  title: 'My CV',
  _id: userId
};

const photo = {
  file: 'blob:http://localhost:8080/01933040-459f-4d1d-a630-d11429881f10',
  get: jest.fn(),
  delete: jest.fn()
};

const setup = props => {
  const shallow = createShallow();
  const wrapper = shallow(<SectionProfile {...props} />);
  // console.log(wrapper.debug());
  return wrapper;
};

describe('Rendering without error', () => {
  it('should render without error with props', () => {
    setup({ profile, photo });
  });

  it('should give no warning with props', () => {
    const propError = checkPropTypes(
      SectionProfile.propTypes,
      { profile, photo },
      'prop',
      SectionProfile.name
    );
    expect(propError).toBeUndefined();
  });

  it('should give a warning with wrong props', () => {
    const propError = checkPropTypes(
      SectionProfile.propTypes,
      { profile: null, photo: 'string' },
      'prop',
      SectionProfile.name
    );
    expect(typeof propError).toBe('string');
  });
});

describe('Rendering children', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ profile, photo });
  });

  it('should render ContactDetails', () => {
    const component = wrapper.find(ContactDetails);
    expect(component.length).toBe(1);
  });

  it('should render Portrait', () => {
    const component = wrapper.find(Portrait);
    expect(component.length).toBe(1);
  });

  it('should render AboutMe', () => {
    const component = wrapper.find(AboutMe);
    expect(component.length).toBe(1);
  });
});
