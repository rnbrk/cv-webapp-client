import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import checkPropTypes from 'check-prop-types';

import SectionJobs from '../../components/SectionJobs';
import TitleSection from '../../components/TitleSection';
import ListItemJobs from '../../components/ListItemJobs';

const jobs = {
  title: 'Job experience',
  paragraph:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  list: [
    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      employerName: 'TESTCORPS',
      name: 'Tester',
      startDate: '2010-01-01T00:00:00.000Z',
      endDate: '2012-05-31T00:00:00.000Z',
      responsibilities: ['Testing stuff', 'Throwing errors', 'Not throwing errors if not wanted']
    },

    {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      employerName: 'Crash test dummys LLC',
      name: 'Crash test dummy',
      endDate: '2018-09-01T00:00:00.000Z',
      startDate: '2012-07-01T00:00:00.000Z',
      responsibilities: [
        'Crashing against stuff',
        'Being put back together',
        'Continously checking my health insurance'
      ]
    }
  ],
  _id: '1234567890abc'
};

const setup = props => {
  const shallow = createShallow();
  const wrapper = shallow(<SectionJobs {...props} />);
  // console.log(wrapper.debug());
  return wrapper;
};

describe('Rendering without error', () => {
  it('should render without error with props', () => {
    setup({ jobs });
  });

  it('should give no warning with props', () => {
    const propError = checkPropTypes(SectionJobs.propTypes, { jobs }, 'prop', SectionJobs.name);
    expect(propError).toBeUndefined();
  });

  it('should give a warning with wrong props', () => {
    const propError = checkPropTypes(
      SectionJobs.propTypes,
      { jobs: 'string' },
      'prop',
      SectionJobs.name
    );
    expect(typeof propError).toBe('string');
  });
});

describe('Rendering children', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ jobs });
  });

  it('should render TitleSection', () => {
    const component = wrapper.find(TitleSection);
    expect(component.length).toBe(1);
  });

  it('should render ListItemJobs', () => {
    const component = wrapper.find(ListItemJobs);
    expect(component.length).toBe(1);
  });
});
