import moment from 'moment';

export const compareDateRange = (a, b, descending = true) => {
  const aCompareDate = a.endDate ? a.endDate : a.startDate;
  const bCompareDate = b.endDate ? b.endDate : b.startDate;

  const firstValue = descending ? 1 : 1;
  const secondValue = -firstValue;

  return moment(aCompareDate).isBefore(bCompareDate) ? firstValue : secondValue;
};
