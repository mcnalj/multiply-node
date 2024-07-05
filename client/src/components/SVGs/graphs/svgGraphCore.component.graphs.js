import React from 'react';

export function SVGCoordinatePlane() {
    return (
        // <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">
            <>
            <defs>
                <marker id="arrow-left-up" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto" markerUnits="strokeWidth">
                    <path d="M3,0 L3,3 L0,1.5 z" fill="black" />
                </marker>
                <marker id="arrow-right-down" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,3 L3,1.5 z" fill="black" />
                </marker>
            </defs>

            <line x1="-10" y1="0" x2="10" y2="0" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)" />
            <line x1="0" y1="-10" x2="0" y2="10" stroke="black" strokeWidth="0.2" markerStart="url(#arrow-left-up)" markerEnd="url(#arrow-right-down)" />

            <text x="10" y="-0.5" textAnchor="middle" fontSize="1.0">x</text>
            <text x="2" y="-10" textAnchor="end" fontSize="1.0">f(x)</text>

            <g id="gridLinesX">
                {[...Array(11)].map((_, i) => {
                    const y = 2 * (i - 5);
                    return (
                        <g key={i}>
                            <line key={i} x1="-10" x2="10" y1={y} y2={y} stroke="gray" strokeWidth="0.05" />
                        </g>
                    );
                })}
            </g>

            <g id="gridLinesY">
                {[...Array(11)].map((_, i) => {
                    const x = 2 * (i - 5);
                    return (
                        <g key={i}>
                            <line key={i} x1={x} x2={x} y1="-10" y2="10" stroke="gray" strokeWidth="0.05" />
                        </g>
                    );
                })}
            </g>

            <g id="hashMarksX">
                {[...Array(11)].map((_, i) => {
                    const x = 2 * i - 10;
                    return (
                        <g key={i}>
                            <line key={i} x1={x} y1="-0.3" x2={x} y2="0.3" stroke="black" strokeWidth="0.1" />
                            <text x={x} y="1.2" textAnchor="middle" fontSize="1">{i - 5 != 0 ? i - 5 : ""}</text>
                        </g>
                    );
                })}
            </g>

            <g id="hashMarksY">
                {[...Array(11)].map((_, i) => {
                    const y = 2 * i - 10;
                    return (
                        <g key={i}>
                            <line key={i} x1="-0.3" y1={y} x2="0.3" y2={y} stroke="black" strokeWidth="0.1" />
                            <text x="-1" y={y} textAnchor="middle" fontSize="1">{i - 5 != 0 ? i - 5 : ""}</text>
                        </g>
                    );
                })}
            </g>
        </>
    );
}