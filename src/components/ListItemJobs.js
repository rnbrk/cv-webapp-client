import React from 'react';
import ItemJob from './ItemJob';

const ListItemJobs = ({ array }) => (
  <div>
    {array.map(job => (
      <ItemJob job={job} key={job._id} />
    ))}
  </div>
);

export default ListItemJobs;
