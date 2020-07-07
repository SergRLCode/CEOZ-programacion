import React from 'react';
import { FormControlLabel, Radio, RadioGroup as RadioG } from '@material-ui/core';
import { RadioGroupInterface } from 'global-interfaces';

const RadioGroup: React.FC<RadioGroupInterface> = ({
  firstVal,
  firstLabel,
  secondVal,
  secondLabel,
  onClick,
}) => {
  let valOne: boolean | string = '';
  let valTwo: boolean | string = '';

  if (firstVal === 'silicon_yes' || firstVal === 'intraocular_yes' || firstVal === 'inputs_yes') {
    valOne = true;
  } else if (firstVal === 'general_anesthesia') {
    valOne = 'General';
  } else if (firstVal === 'flexible') {
    valOne = 'Flexible';
  }

  if (secondVal === 'silicon_no' || secondVal === 'intraocular_no' || secondVal === 'inputs_no') {
    valTwo = false;
  } else if (secondVal === 'local_anesthesia') {
    valTwo = 'Local';
  } else if (secondVal === 'pmma') {
    valTwo = 'PMMA';
  }

  return (
    <RadioG defaultValue={secondVal}>
      <div className="radio_group">
        <FormControlLabel
          value={secondVal}
          label={secondLabel}
          control={<Radio color="primary" size="small" onClick={() => onClick(valTwo)} />}
        />
        <FormControlLabel
          value={firstVal}
          label={firstLabel}
          control={<Radio color="primary" size="small" onClick={() => onClick(valOne)} />}
        />
      </div>
    </RadioG>
  );
};

export default RadioGroup;
