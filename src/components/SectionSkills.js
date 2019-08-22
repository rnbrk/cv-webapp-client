import React from 'react';
import { Typography } from '@material-ui/core';
import { Build } from '@material-ui/icons';

import StyledPaper from './StyledPaper';

const SectionSkills = props => (
  <StyledPaper>
    <Typography variant="h2" align="center" gutterBottom>
      <Build color="primary" /> Vaardigheden
    </Typography>

    <Typography variant="h3" align="left">
      Logistiek projectmedewerker
    </Typography>
    <Typography variant="subtitle2" align="left" gutterBottom>
      bol.com
    </Typography>
    <Typography variant="body1" align="left" gutterBottom>
      Als logistiek projectmedewerker was ik verantwoordelijk voor het procesverloop rond de
      voorraad van externe verkopers in de warenhuizen van bol.com. Verantwoordelijkheden hielden
      in: aanspreekpunt voor voorraadgerelateerde vragen, rapporteren van issues in de keten d.m.v.
      analyses en stakeholder in logistieke IT-projecten. In mijn vrije tijd was ik bezig met het
      automatiseren en verbeteren van processen door het bouwen van scripts in Python. Zo heb ik
      onder andere een script gemaakt voor het opdelen van retourorderbestanden in kleinere stukken,
      zodat ze konden worden verwerkt door het warehousemanagementsysteem.
    </Typography>
    <Typography variant="body2" align="center" gutterBottom>
      Januari 2019
    </Typography>
  </StyledPaper>
);

export default SectionSkills;
