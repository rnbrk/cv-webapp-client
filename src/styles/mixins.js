const dotMixin = {
  content: '""',
  display: 'block',
  width: 8,
  height: 8,
  backgroundColor: 'white',
  border: '3px solid #2196F3',
  borderRadius: '50%'
};

const moveUpMixin = {
  zIndex: 1000
};

const centerMixin = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

export { dotMixin, moveUpMixin, centerMixin };
