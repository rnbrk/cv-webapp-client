import React from 'react';
import { Typography } from '@material-ui/core';

const TitleItem = ({ title, subtitle }) => (
  <>
    <Typography variant="h3" align="left">
      {title}
    </Typography>
    <Typography variant="subtitle2" align="left" gutterBottom>
      {subtitle}
    </Typography>
  </>
);

export default TitleItem;
