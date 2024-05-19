import InputLabelMUI from '@mui/material/InputLabel';

const sizes = {
    medium: 'medium',
    small: 'small',
};

function InputLabel({
    children,
    size = sizes.medium,
}) {
    return (
        <InputLabelMUI
            size={size}
        >
            {children}
        </InputLabelMUI>
    );
}

export default InputLabel;