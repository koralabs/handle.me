import Link from "next/link";
import React from "react";

interface ButtonProps {
    buttonStyle?: "primary" | "secondary" | "link";
    internal?: boolean;
    href?: string;
    className?: string;
    disabled?: boolean;
    animate?: boolean;
    children?: JSX.Element | JSX.Element[] | string | string[];
    [key: string]: unknown;
}

export const Button: React.FC<ButtonProps> = ({
    className = "",
    href,
    internal = true,
    buttonStyle = "secondary",
    animate = false,
    children,
    disabled,
    ...rest
}): JSX.Element => {
    const classes = [
        "cursor-pointer hover:shadow-lg m-0 py-4 px-6 text-center rounded-lg inline-block font-bold",
    ];

    if (disabled) {
        classes.push("cursor-not-allowed bg-dark-300 hover:bg-dark-300 active:bg-dark-300 text-dark-350");
    }

    if (animate) {
        classes.push("transform hover:translate-x-2")
    }

    switch (buttonStyle) {
        case "primary":
            !disabled && classes.push("bg-primary-200 hover:bg-dark-100 active:bg-dark-100 text-dark-100");
        case "secondary":
        default:
            !disabled && classes.push("bg-primary-100 hover:bg-primary-200 active:bg-dark-100 text-white");
    }

    console.log('className', className);

    if (internal && href?.length) {
        return (
            <Link href={href} className={classes.join(" ") + " " + className} {...rest}>
                <a>{children}</a>
            </Link>
        );
    }

    if (!internal && href?.length) {
        return (
            <a href={href} className={classes.join(" ") + " " + className} {...rest}>
                {children}
            </a>
        );
    }

    return (
        <button className={classes.join(" ") + " " + className} disabled={disabled} {...rest}>
            {children}
        </button>
    );
};

export default Button;
