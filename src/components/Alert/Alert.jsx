import {Alert} from "@mui/material";

const variants = {
    filled: 'filled',
    outlined: 'outlined'
};

const severities = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning'
};

function CustomAlert({
                   severity = severities.error,
                   variant = variants.filled,
                   children
}) {
    return (
        <Alert
            severity={severity}
            variant={variant}
        >
            {children}
        </Alert>
    )
}

export default CustomAlert;