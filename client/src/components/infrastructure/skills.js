    // this is not being used yet, but a TODO is to rationalize the section, unit, topic(or skill) object
    const multiplicationUnitSkills = ["squares", "cubes", "mixed"];
    const equationsOfLines = "equationsOfLines";
    const exponentsUnitSkills = ["positive", "negative", "fractional", "negativeFractional", "mixed"];
    const factoringQuadraticsUnitSkills = ["differenceOfSquares", "factoringQuadratics"];
    const unitCircleUnitSkills = ["essentialUnitCircle", "halfUnitCircle", "fullUnitCircle"];
    const functionsUnitSkills = ["functionNotation", "plottingPointsPolynomials", "plottingPointsSine", "plottingPointsCosine", "identifyingFunctions"];
    // changed from topics to units and topicName to unitName so it's out of sync with summerPrepTopics.component.summerPrep.js 
    const units = [
        {
            unitName: "multiplication", buttonText: "Multiplication", path: "/multiplicationTopics"         
        },
        {
            unitName: "functions", buttonText: "Functions", path: "/plottingPointsTopics"
        },
        {
            unitName: "exponents", buttonText: "Exponents", path: "/exponentsTopics"
        },
        {
            unitName: "quadratics", buttonText: "FactoringQuadratics", path: "/factoringQuadraticsTopics"
        },
        {
            unitName: "unitCircle", buttonText: "The Unit Circle", path: "/unitCircleTopics"
        }        
    ];

    const multiplicationSkills = ["squares", "cubes", "mixed"];
    const functionsSkills = ["functionNotation", "plottingPointsPolynomials", "plottingPointsSine", "plottingPointsCosine", "identifyingFunctions", "equationsOfLines"];
    const exponentsSkills = ["positive", "negative", "fractional", "negativeFractional", "mixed"];
    const quadraticsSkills = ["differenceOfSquares", "factoringQuadratics"];
    const unitCircleSkills = ["essentialUnitCircle", "halfUnitCircle", "fullUnitCircle"];
