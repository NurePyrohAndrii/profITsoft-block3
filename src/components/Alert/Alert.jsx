import AlertMUI from "@mui/material/Alert";

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
        <AlertMUI
            severity={severity}
            variant={variant}
        >
            {children}
        </AlertMUI>
    )
}

export default CustomAlert;