import useTheme from "../../misc/hooks/useTheme";
import SvgIcon from "../SvgIcon";
import * as React from "react";

const Filter = ({
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
                <path
                    d="M3.47 5c-.22 0-.43.08-.6.21-.44.34-.52.97-.18 1.4v.01L7 12.14v5.91l3.64 3.66c.36.39 1.02.39 1.41 0 .39-.39.39-1.02.01-1.41L9 17.22v-5.77L4.27 5.39c-.19-.25-.49-.39-.8-.39m18.15-1.78c-.19-.14-.4-.22-.62-.22H7c-.22 0-.43.08-.62.22a1 1 0 00-.17 1.4L11 10.75v5.12c-.04.29.06.6.29.83l4.01 4.01c.39.39 1.02.39 1.41 0 .23-.21.33-.53.29-.83v-9.13l4.79-6.13a1 1 0 00-.17-1.4M15 10.05v7.53l-2-2v-5.52L9.04 5h9.92L15 10.05z"/>
            </svg>
        </SvgIcon>
    );
}

export default Filter;