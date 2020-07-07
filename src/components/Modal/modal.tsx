import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { useStyles, getModalStyle } from './modal.style';
import { ModalInterface } from './modal.interface';

const SimpleModal: React.FC<ModalInterface> = ({ title, content, open, setOpen }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleClose: Function = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{title}</h2>
          <div id="simple-modal-description">{content}</div>
        </div>
      </Modal>
    </div>
  );
};

export default SimpleModal;
