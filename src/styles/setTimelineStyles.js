import moment from 'moment';

const setTopDivider = (job, newerJob) => {
  // Check if top of the timeline needs a divider
  const topHasGapBetweenDates =
    newerJob && moment(job.endDate).isBefore(newerJob.startDate, 'month');
  if (topHasGapBetweenDates) return 'divider';
};

const setBottomDivider = (job, olderJob) => {
  // Check if bottom of the timeline needs a divider
  const bottomHasGapBetweenDates =
    olderJob && moment(job.startDate).isAfter(olderJob.endDate, 'month');
  if (bottomHasGapBetweenDates) return 'divider';
};

const setTopDateTextVisiblity = (job, newerJob) => {
  // Check if top should have date text removed to prevent overlapping of date text
  const topHasSameDate = newerJob && moment(job.endDate).isSame(newerJob.startDate, 'month');
  if (topHasSameDate) return true;
};

const setTimelineStyles = (job, index, array) => {
  const newerJob = array[index - 1];
  const olderJob = array[index + 1];

  return {
    topStyle: setTopDivider(job, newerJob),
    bottomStyle: setBottomDivider(job, olderJob),
    omitEndDate: setTopDateTextVisiblity(job, newerJob)
  };
};

export default setTimelineStyles;
