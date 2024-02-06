import CloseIcon from '@mui/icons-material/Close';
import { Modal, Box } from '@mui/material';
import React from 'react';

type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalContent: JSX.Element;
  width?: string;
  open: boolean;
};

const closeIconStyles = {
  '&:hover': {
    color: 'red',
  },
  position: 'absolute',
  cursor: 'pointer',
  color: 'black',
  right: '6px',
  top: '6px',
};

const wrapperStyle = {
  transform: 'translate(-50%, -50%)',
  position: 'absolute' as const,
  bgcolor: 'background.paper',
  border: `1px solid gray`,
  borderRadius: '16px',
  minWidth: '250px',
  maxWidth: '850px',
  padding: '24px',
  boxShadow: 24,
  left: '50%',
  top: '50%',
};

export const CommonModal = ({
  setOpenModal,
  modalContent,
  width,
  open,
}: Props) => {
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      onClose={() => {
        return;
      }}
      open={open}
    >
      <Box sx={{ ...wrapperStyle, width: { width } }}>
        <CloseIcon onClick={handleClose} sx={closeIconStyles} />
        {modalContent}
      </Box>
    </Modal>
  );
};
