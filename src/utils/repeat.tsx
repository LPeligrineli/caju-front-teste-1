import React, { useId } from "react";

interface RepeatComponentProps {
    children: React.ReactNode;
    times: number;
}

const RepeatComponent: React.FC<RepeatComponentProps> = ({ children, times }) => {
    const id = useId();
    if (!children || times <= 0) {
        return null;
    }
    return (
        <>
            {Array.from({ length: times }, (_, index) => (
                <React.Fragment key={id + index}>
                    {children}
                </React.Fragment>
            ))}
        </>
    );
};

export default RepeatComponent;