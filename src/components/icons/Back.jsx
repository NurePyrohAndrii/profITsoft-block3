import useTheme from "../../misc/hooks/useTheme";
import SvgIcon from "../SvgIcon";
import * as React from "react";

const Back = ({
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
                <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"/>
            </svg>
        </SvgIcon>
    );
}

export default Back;