import React from 'react'
import SnackbarMUI from '@mui/material/Snackbar'

const horizontalPosition = {
    right: 'right',
    left: 'left',
    center: 'center'
}

const verticalPosition = {
    top: 'top',
    bottom: 'bottom',
}

const Snackbar = ({
    horizontal = horizontalPosition.center,
    vertical = verticalPosition.top,
    autoHideDuration = 3000,
    open,
    message,
    onClose,
    children
}) => {
    return (
        <SnackbarMUI
            anchorOrigin={{ horizontal, vertical }}
            autoHideDuration={autoHideDuration}
            open={open}
            onClose={onClose}
            message={message}
        >
            {children}
        </SnackbarMUI>
    )
}

export default Snackbar