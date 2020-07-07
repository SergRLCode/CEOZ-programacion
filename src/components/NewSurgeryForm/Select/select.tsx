import React from 'react';
import { useSelector } from 'react-redux';
import { FormControl, Select as Sel } from '@material-ui/core';
import { State } from 'redux/state.interface';
import { useStyles } from './select.style';

const Select = (data: any) => {
  const classes = useStyles();
  const selectedDay = useSelector((state: State) => state['SelectedDay']);

  const menuItems = data['data'].map((item: any, index: number) => {
    let _item;
    if (data['name'] === 'profesionalID') {
      _item = (
        <option key={index} value={item['profesionalID']}>
          {item['name']}
        </option>
      );
    } else {
      if (selectedDay['availableTime'] >= item['duration']) {
        _item = <option key={index}>{item['name']}</option>;
      }
    }
    return _item;
  });

  const OnChangeEv = (ev: React.ChangeEvent<{ name?: string; value: unknown }>) =>
    data.changeState(ev.target.name, ev.target.value);

  return (
    <FormControl variant="outlined" className={classes.margin}>
      <Sel
        native
        value={data['value']}
        onChange={OnChangeEv}
        inputProps={{
          name: data['name'],
          id: 'demo-simple-select-outlined',
        }}
      >
        <option aria-label="None" value="" />
        {menuItems}
      </Sel>
    </FormControl>
  );
};

export default Select;
