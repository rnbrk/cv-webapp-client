import React, { useState } from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

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

const EditableDate = ({
  classes,
  initialDate,
  changeCallback,
  submitCallback,
  disabled = false,
  format = 'dd-MM-yyyy',
  id,
  ...rest
}) => {
  const [date, setDate] = useState(initialDate);

  const handleChange = e => {
    setDate(e.target.value || null);
    if (changeCallback) changeCallback(e, date, id);
  };

  const handleBlur = e => {
    if (submitCallback) submitCallback(e, date, id);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <React.Fragment>
        {disabled && date !== null && <span>{moment(date).format(format)}</span>}
        {!disabled && (
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format={format}
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={date}
            onChange={handleChange}
            onBlur={handleBlur}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        )}
      </React.Fragment>
    </MuiPickersUtilsProvider>
  );
};

export default withStyles(styles)(EditableDate);
