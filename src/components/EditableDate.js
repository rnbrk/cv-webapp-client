import React, { useState } from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  inheritStyles: {
    color: 'inherit',
    font: 'inherit',
    fontSize: 'inherit',
    wordSpacing: 'inherit',
    textTransform: 'inherit',
    textShadow: 'inherit',
    textAlign: 'inherit'
  }
};

/**
 * Creates an array of "views" to be used by the Material UI Datepicker
 * prevents you from being able to pick date options that won't be shown
 * @param {string} dateFormat | such as 'DD-MM-YYYY'
 * @returns {array} views | looks like ['year', 'month', 'date']
 */
const createViewArrayFromDateFormat = dateFormat => {
  const views = [];
  if (dateFormat.includes('Y')) views.push('year');
  if (dateFormat.includes('M')) views.push('month');
  if (dateFormat.includes('D')) views.push('date');

  return views;
};

const EditableDate = ({
  classes,
  initialDate,
  changeCallback,
  submitCallback,
  disabled = false,
  format = 'dd-MM-YYYY',
  id,
  ...rest
}) => {
  const [date, setDate] = useState(initialDate);

  const handleChange = date => {
    setDate(date || null);
    if (changeCallback) changeCallback(date);
  };

  const handleAccept = date => {
    if (submitCallback) submitCallback(date);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <React.Fragment>
        {disabled && date !== null && <span>{moment(date).format(format)}</span>}
        {!disabled && (
          <DatePicker
            variant="inline"
            margin="normal"
            views={createViewArrayFromDateFormat(format)}
            format={format}
            id={id}
            value={date}
            onChange={handleChange}
            onAccept={handleAccept}
            InputProps={{
              'aria-label': 'change date',
              style: { ...styles.inheritStyles }
            }}
          />
        )}
      </React.Fragment>
    </MuiPickersUtilsProvider>
  );
};

export default withStyles(styles)(EditableDate);
