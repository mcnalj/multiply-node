import React from 'react';

import {
    SVGCoordinatePlane
} from './svgGraphCore.component.graphs.js';

import {
    XSquaredGraphPath,
    XCubedGraphPath,
    EXGraphPath,
    LnXGraphPath,
    OverXGraphPath,
    AbsoluteValueGraphPath
} from './svgGraphPaths.component.graphs.js';

export function XSquaredGraph() {
    return (
        <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">
            <SVGCoordinatePlane />
            <XSquaredGraphPath />
        </svg>
    )
}

export function XCubedGraph() {
    return (
        <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">
            <SVGCoordinatePlane />
            <XCubedGraphPath />
        </svg>
    )
}

export function EXGraph() {
    return (
        <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">
            <SVGCoordinatePlane />
            <EXGraphPath />
        </svg>
    )
}

export function LnXGraph() {
    return (
        <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">
            <SVGCoordinatePlane />
            <LnXGraphPath />
        </svg>
    )
}

export function OverXGraph() {
    return (
        <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">
            <SVGCoordinatePlane />
            <OverXGraphPath />
        </svg>
    )
}

export function AbsoluteValueGraph() {
    return (
        <svg width="400" height="400" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">
            <SVGCoordinatePlane />
            <AbsoluteValueGraphPath />
        </svg>
    )
}