import { Alert, AlertProps, Snackbar, SnackbarProps } from '@mui/material';
import React from 'react';

interface NotificationSnackbarProps extends AbstractComponentProps {
    snackbar?: SnackbarProps;
    alert?: AlertProps;
}

const NotificationSnackbar = (props: NotificationSnackbarProps): JSX.Element => {
    const {snackbar = { anchorOrigin: { vertical: 'bottom', horizontal: 'right' } }, alert = {}} = props;
    const {open, onClose} = snackbar;

    const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(open ? open || true : true);

    const handleClose = (event, reason?): void => {
        setSnackbarOpen(false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onClose && onClose(event, reason);
    }

    return (
        <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleClose} {...snackbar}>
            <Alert onClose={handleClose} {...alert}>
                {props.children}
            </Alert>
        </Snackbar>
    );
}

export default NotificationSnackbar;