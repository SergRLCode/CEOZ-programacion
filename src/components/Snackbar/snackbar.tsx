import React from 'react';
import { Snackbar as Snack } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { SnackbarInterface } from './snackbar.interface';

const Alert = (props: any) => <MuiAlert elevation={6} variant="filled" {...props} />;

const Snackbar: React.FC<SnackbarInterface> = ({ open, setOpen, severity, content }) => {
  return (
    <div>
      <Snack
        open={open}
        autoHideDuration={1500}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {open && <Alert severity={severity}>{content}</Alert>}
      </Snack>
    </div>
  );
};

export default Snackbar;
