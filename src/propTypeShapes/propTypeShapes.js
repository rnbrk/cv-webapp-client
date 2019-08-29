const cvProfileShape = {
  cvs: PropTypes.arrayOf(PropTypes.object),
  dateOfBirth: PropTypes.string,
  email: PropTypes.string,
  fullName: PropTypes.string,
  firstName: PropTypes.string,
  profession: PropTypes.string,
  lastName: PropTypes.string,
  paragraph: PropTypes.string,
  title: PropTypes.string,
  _id: PropTypes.string
};

const cvPhotoShape = {
  file: PropTypes.string,
  get: PropTypes.func,
  delete: PropTypes.func
};

export { cvProfileShape, cvPhotoShape };
