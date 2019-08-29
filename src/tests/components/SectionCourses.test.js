import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import checkPropTypes from 'check-prop-types';

import SectionCourses from '../../components/SectionCourses';
import TitleSection from '../../components/TitleSection';
import ItemCourse from '../../components/ItemCourse';

const courses = {
  list: [
    {
      name: 'The Complete Node.js Developer Course',
      instituteName: 'Udemy / Andrew Mead',
      _id: '5d5eff42a7c2c117fe5eb08f'
    },
    {
      name: 'The Complete React Developer Course',
      instituteName: 'Udemy / Andrew Mead',
      _id: '5d5eff42a7c2c117fe5eb090'
    },
    {
      name: 'Advanced CSS and Sass',
      instituteName: 'Udemy / Jonas Schmedtmann',
      _id: '5d5eff42a7c2c117fe5eb091'
    },
    {
      name: 'React Testing with Jest and Enzyme',
      instituteName: 'Udemy / Bonnie Schulkin',
      _id: '5d5eff42a7c2c117fe5eb092'
    },
    {
      name: "You Don't Know JS Book Series",
      instituteName: "O'Reilly Media / Kyle Sympson",
      _id: '5d5eff42a7c2c117fe5eb093'
    }
  ],
  paragraph:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  title: 'Courses'
};

const setup = props => {
  const shallow = createShallow();
  const wrapper = shallow(<SectionCourses {...props} />);
  // console.log(wrapper.debug());
  return wrapper;
};

describe('Rendering without error', () => {
  it('should render without error with props', () => {
    setup({ courses });
  });

  it('should give no warning with props', () => {
    const propError = checkPropTypes(
      SectionCourses.propTypes,
      { courses },
      'prop',
      SectionCourses.name
    );
    expect(propError).toBeUndefined();
  });

  it('should give a warning with wrong props', () => {
    const propError = checkPropTypes(
      SectionCourses.propTypes,
      { courses: null },
      'prop',
      SectionCourses.name
    );
    expect(typeof propError).toBe('string');
  });
});

describe('Rendering children', () => {
  let wrapper;
  beforeEach(() => {
    const list = JSON.parse(JSON.stringify(courses.list));
    wrapper = setup({ courses: { ...courses, list } });
  });

  it('should render TitleSection', () => {
    const component = wrapper.find(TitleSection);
    expect(component.length).toBe(1);
  });

  it('should render ItemCourse', () => {
    const component = wrapper.find(ItemCourse);
    expect(component.length).toBe(courses.list.length);
  });

  it('should render ItemCourse alphabetically sorted on name', () => {
    // TODO ?
  });

  it('should not render ItemCourse if no course objects are supplied', () => {
    wrapper = setup();
    const component = wrapper.find(ItemCourse);
    expect(component.length).toBe(0);
  });
});
