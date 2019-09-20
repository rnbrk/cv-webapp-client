import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';

import EditableText from '../components/EditableText';
import EditModeContext from '../contexts/editMode';

const TitleItem = ({
  title,
  subtitle,
  titleName = 'title',
  subtitleName = 'subtitle',
  gutterBottom = true,
  setUpdates
}) => {
  const [editMode] = useContext(EditModeContext);

  return (
    <>
      <Typography variant="h3" align="left">
        <EditableText
          initialContent={title}
          submitCallback={setUpdates}
          disabled={!editMode}
          id={titleName}
        />
      </Typography>
      <Typography variant="subtitle2" align="left" gutterBottom={gutterBottom}>
        <EditableText
          initialContent={subtitle}
          submitCallback={setUpdates}
          disabled={!editMode}
          id={subtitleName}
        />
      </Typography>
    </>
  );
};

export default TitleItem;
