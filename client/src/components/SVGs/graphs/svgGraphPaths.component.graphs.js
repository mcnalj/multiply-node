import React from 'react';

export function XSquaredGraphPath() {
    return (
        <polyline
            points={[
                ...Array.from({ length: 100 }, (_, i) => i).map(i => {
                    const x = (i / 10) - 5;
                    const y = (x ** 2) * (-1);
                    return `${2 * x} ${2 * y}`;
                })
            ]}
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
        />
    );
}

export function HalfXSquaredGraphPath() {
    return (
        <polyline
            points={[
                ...Array.from({ length: 100 }, (_, i) => i).map(i => {
                    const x = (i / 10) - 5;
                    const y = ((x ** 2)/2) * (-1);
                    return `${2 * x} ${2 * y}`;
                })
            ]}
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
        />
    );
}

export function HalfXSquaredGraphPathMinusFour() {
    return (
        <polyline
            points={[
                ...Array.from({ length: 100 }, (_, i) => i).map(i => {
                    const x = (i / 10) - 5;
                    const y = (((x ** 2)/2) -4) * (-1);
                    return `${2 * x} ${2 * y}`;
                })
            ]}
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
        />
    );
}

export function XSquaredPlusTwoXMinusFiveGraphPath() {
    return (
        <polyline
            points={[
                ...Array.from({ length: 100 }, (_, i) => i).map(i => {
                    const x = (i / 10) - 5;
                    const y = ((x ** 2) + (2 * x) - 5) * (-1);
                    return `${2 * x} ${2 * y}`;
                })
            ]}
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
        />
    );
}

export function XSquaredPlusTwoXPlusThreeGraphPath() {
    return (
        <polyline
            points={[
                ...Array.from({ length: 100 }, (_, i) => i).map(i => {
                    const x = (i / 10) - 5;
                    const y = ((x ** 2) + (2 * x) + 3) * (-1);
                    return `${2 * x} ${2 * y}`;
                })
            ]}
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
        />
    );
}




export function XCubedGraphPath() {
    return (
        <polyline
            points={[
                ...Array.from({ length: 100 }, (_, i) => i).map(i => {
                    const x = (i / 10) - 5;
                    const y = (x ** 3) * (-1);
                    return `${2 * x} ${2 * y}`;
                })
            ]}
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
        />

    );
}

export function EXGraphPath() {
    return (
        <polyline
            points={[
                ...Array.from({ length: 100 }, (_, i) => i).map(i => {
                    const x = (i / 10) - 5;
                    const y = Math.exp(x) * (-1);
                    return `${2 * x} ${2 * y}`;
                })
            ]}
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
        />
    );
}

export function LnXGraphPath() {
    return (
        <polyline
            points={[
                ...Array.from({ length: 1000 }, (_, i) => i + 1).map(i => {
                    const x = (i * .01);
                    const y = (Math.log(x) * (-1));
                    return `${2 * x} ${2 * y}`;
                })
            ]}
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
        />
    );
}

export function OverXGraphPath() {
    return (
        <>
            <polyline
                points={[
                    ...Array.from({ length: 99 }, (_, i) => i + 1).map(i => {
                        const x = (i - 100) / 10;
                        const y = (1 / (x / 2)) * -2;
                        return `${x} ${y}`;
                    })
                ]}
                stroke="blue"
                fill="none"
                strokeWidth="0.1"
            />

            <polyline
                points={[
                    ...Array.from({ length: 99 }, (_, i) => i + 1).map(i => {
                        const x = ((i + 100) - 100) / 10;
                        const y = x != 0 ? (1 / (x / 2)) * -2 : 1000;
                        return `${x} ${y}`;
                    })
                ]}
                stroke="blue"
                fill="none"
                strokeWidth="0.1"
            />
        </>
    );
}

export function AbsoluteValueGraphPath() {
    return (
        <polyline 
            points="-10,-10 0,0 10,-10"
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
        />
    );
}




