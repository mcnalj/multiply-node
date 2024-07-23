import React, { useState, useEffect } from 'react';

export function LimitsGraphPath ({questionObject}) {

    const points = Array.from({ length: 200 }, (_, i) => {
        const x = (i / 20) - 5;
        let y = ((x ** 2) -3) * (-1);
        return { x: 2 * x, y: 2 * y };
    });

    const absoluteValuePointsA = `-10,-2 ${questionObject.questionData.limitPoint-0.3},-2 `;
    const absoluteValuePointsB = `${parseFloat(questionObject.questionData.limitPoint)+0.3}, 2, 10,2`;  


    const [limitY, setLimitY] = useState(0);
    
    useEffect(() => {
        const limitPoint = parseFloat(questionObject.questionData.limitPoint);
        if (!isNaN(limitPoint)) {
            const calculatedLimitY = ((((limitPoint / 2) ** 2) - 3) * (-1)) * 2;
            setLimitY(calculatedLimitY);
        }
    }, [questionObject.questionData.limitPoint]);

    const pointsBeforeHole = points.filter(point => point.x > questionObject.questionData.limitPoint);
    const pointsAfterHole = points.filter(point => point.x < questionObject.questionData.limitPoint);


    return (
        <>
        <polyline 
            points={absoluteValuePointsA}
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
        />

        <polyline 
            points={absoluteValuePointsB}
            stroke="blue"
            fill="none"
            strokeWidth="0.2"
        />

        <circle cx={questionObject.questionData.limitPoint} cy="-2" r="0.3" fill="none" strokeWidth="0.2" stroke="blue" />
        <circle cx={questionObject.questionData.limitPoint} cy="2" r="0.3" fill="none" strokeWidth="0.2" stroke="blue" />
      </>
    );
    // return (
    //     <>
    //         <polyline
    //         points={pointsBeforeHole.map(point => `${point.x} ${point.y}`).join(' ')}
    //         stroke="blue"
    //         fill="none"
    //         strokeWidth="0.2"
    //         />

    //         <polyline
    //             points={pointsAfterHole.map(point => `${point.x} ${point.y}`).join(' ')}
    //             stroke="blue"
    //             fill="none"
    //             strokeWidth="0.2"
    //         />
            
    //         <circle cx={questionObject.questionData.limitPoint} cy={limitY} r="0.3" fill="none" strokeWidth="0.2" stroke="blue" />
    //         <circle cx={questionObject.questionData.limitPoint} cy={questionObject.questionData.pointDiscontinuity} r="0.3" fill="blue" strokeWidth="0.2" stroke="blue" />
    //   </>
    // );    
}