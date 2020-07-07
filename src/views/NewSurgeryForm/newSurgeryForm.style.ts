import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }),
);

export const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText('#0078A7'),
    backgroundColor: '#0078A7',
    '&:hover': {
      backgroundColor: '#005c80',
    },
  },
}))(Button);
