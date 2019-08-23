import React from 'react';
import moment from 'moment';

import ItemJob from './ItemJob';

const ListItemJobs = ({ array }) => (
  <div>
    {array.map((job, i) => {
      const newerJob = array[i - 1];
      const olderJob = array[i + 1];

      const timelineStyles = {};
      debugger;
      if (newerJob) {
        if (moment(job.endDate).isBefore(newerJob.startDate, 'month')) {
          timelineStyles.topDivider = true;
        }

        if (moment(job.endDate).isSame(newerJob.startDate, 'month')) {
          timelineStyles.omitEndDate = true;
        }
      }

      if (olderJob) {
        if (moment(job.startDate).isAfter(olderJob.endDate, 'month')) {
          timelineStyles.bottomDivider = true;
        }
      }

      return <ItemJob job={job} key={job._id} timelineStyles={timelineStyles} />;
    })}
  </div>
);

export default ListItemJobs;
