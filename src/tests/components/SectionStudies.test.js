import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import checkPropTypes from 'check-prop-types';

import SectionStudies from '../../components/SectionStudies';
import TitleSection from '../../components/TitleSection';
import ItemStudy from '../../components/ItemStudy';

const studies = {
  title: 'Education',
  paragraph:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  list: [
    {
      name: 'Testing Sciences',
      instituteName: 'University of Test City',
      startDate: '2006-09-01T00:00:00.000Z',
      endDate: '2008-07-31T00:00:00.000Z',
      title: 'Bachelor of Testing',
      _id: '1'
    },
    {
      name: 'Advanced Testing Principles',
      startDate: '2008-09-01T00:00:00.000Z',
      title: 'Master of Testing',
      _id: '2'
    },

    {
      name: 'Crash Testing - First Hand Experience',
      endDate: '2010-07-31T00:00:00.000Z',
      title: 'Master of Applied Testing',
      _id: '3'
    }
  ]
};

const setup = props => {
  const shallow = createShallow();
  const wrapper = shallow(<SectionStudies {...props} />);
  // console.log(wrapper.debug());
  return wrapper;
};

describe('Rendering without error', () => {
  it('should render without error with props', () => {
    setup({ studies });
  });

  it('should give no warning with correct props', () => {
    const propError = checkPropTypes(
      SectionStudies.propTypes,
      { studies },
      'prop',
      SectionStudies.name
    );
    expect(propError).toBeUndefined();
  });

  it('should give a warning with wrong props', () => {
    const propError = checkPropTypes(
      SectionStudies.propTypes,
      { studies: null },
      'prop',
      SectionStudies.name
    );
    expect(typeof propError).toBe('string');
  });
});

describe('Rendering children', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ studies });
  });

  it('should render TitleSection', () => {
    const component = wrapper.find(TitleSection);
    expect(component.length).toBe(1);
  });

  it('should render ItemCourse', () => {
    const component = wrapper.find(ItemStudy);
    expect(component.length).toBe(studies.list.length);
  });

  it('should render ItemCourse sorted by dateRange', () => {
    // TODO
  });

  it('should not render ItemStudy if no study objects are supplied', () => {
    wrapper = setup();
    const component = wrapper.find(ItemStudy);
    expect(component.length).toBe(0);
  });
});
