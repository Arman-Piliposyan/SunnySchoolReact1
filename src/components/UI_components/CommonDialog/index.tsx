import {
  DialogActions,
  DialogContent,
  SvgIconProps,
  DialogTitle,
  Dialog,
} from '@mui/material';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import CloseIcon from '@mui/icons-material/Close';
import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

type Props = {
  buttonColor?:
    | 'secondary'
    | 'inherit'
    | 'primary'
    | 'success'
    | 'warning'
    | undefined
    | 'error'
    | 'info';
  confirmIcon?: React.ReactElement<SvgIconProps> | null;
  dialogContent?: ReactNode | string;
  dialogActions?: ReactJSXElement;
  handleCloseDialog: () => void;
  confirmAction: () => void;
  isOpenDialog: boolean;
  dialogTitle?: string;
  confirmText?: string;
  cancelText?: string;
};

export const CommonDialog = ({
  confirmIcon = null,
  handleCloseDialog,
  dialogContent,
  confirmAction,
  isOpenDialog,
  dialogTitle,
  buttonColor,
  confirmText,
  cancelText,
}: Props) => {
  return (
    <Dialog
      sx={{ marginLeft: 0 }}
      open={isOpenDialog}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>
        <Button
          onClick={confirmAction}
          endIcon={confirmIcon}
          color={buttonColor}
          variant="contained"
          size="small"
        >
          {confirmText}
        </Button>
        <Button
          onClick={handleCloseDialog}
          endIcon={<CloseIcon />}
          variant="contained"
          color="secondary"
          size="small"
        >
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
