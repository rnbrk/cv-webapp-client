import checkPropTypes from 'check-prop-types';

/**
 * Inserts props into the provided React compoenent
 * and checks whether there are PropTypes errors in the console
 * @function checkProps
 * @param {React.Component} component
 * @param {object} conformingProps
 */
export const checkProps = (Component, conformingProps) => {
  const propError = checkPropTypes(Component.propTypes, conformingProps, 'prop', Component.name);
  expect(propError).toBeUndefined();
};

/**
 * Returns nodes with the given data-test attribute
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);
