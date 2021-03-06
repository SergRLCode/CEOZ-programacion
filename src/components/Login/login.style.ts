import { withStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

export default withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText('#0078A7'),
    backgroundColor: '#0078A7',
    '&:hover': {
      backgroundColor: '#005c80',
    },
  },
}))(Button);
