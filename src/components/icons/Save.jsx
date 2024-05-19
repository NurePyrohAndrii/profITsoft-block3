import useTheme from "../../misc/hooks/useTheme";
import SvgIcon from "../SvgIcon";
import * as React from "react";

const Save = ({
    color = 'default', // default | header | error | success | warning | info | <string>
    size = 32
}) => {
    const {theme} = useTheme();
    const actualColor = theme.icon.color[color] || color;
    return (
        <SvgIcon
            style={{
                height: `${size}px`,
                width: `${size}px`,
            }}
            viewBox="0 0 24 24">
            <svg
                fill={actualColor}
            >
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                <path d="M17 21v-8H7v8M7 3v5h8"/>
            </svg>
        </SvgIcon>
    );
}

export default Save;