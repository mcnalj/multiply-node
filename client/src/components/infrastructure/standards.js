export const standards =
    [
        {
            "categoryTitle": "Limits",
            "categoryDescrption": "Standards related to limits and their applications.",
            "id": "limits",
            "topicsArray": [
                {

                },
            ]
        },
        {
            "categoryTitle": "Differentiation",
            "categoryDescrption": "Standards related to the derivative and its applications.",
            "id": "differentiation",
            "topicsArray": [
                {
                    "topicTitle": "Derivatives Concepts",
                    "topicDescription": "The fundamental meaning of the derivative.",
                    "id": "derivativeConcepts",
                    "topicStandards": [
                        {
                            "standardTitle": "Average vs. Instantaneous Rate of Change",
                            "standardDescription": "I can use a chart or graph to calculate average rate of change and approximate instantaneous rate of change.",
                            "standardExample": null,
                            "id": "averageRateOfChange"
                        },
                        {
                            "standardTitle": "The Meaning of the Derivative",
                            "standardDescription": "I can recognize that the derivative is the slope of a line tangent to a function, the slope of a function at a point, and the instantaneous rate of change of a function.",
                            "standardExample": null,
                            "id": "meaningOfDerivative"
                        },
                        {
                            "standardTitle": "The Limit Definition of the Derivative",
                            "standardDescription": "I can recognize the limit definition of the derivative.",
                            "standardExample": `\\frac{d}{dx}x^2 = \\lim_{h \\to 0} \\frac{(x+h)^2 - x^2}{h}`,
                            "id": "limitDefinitionOfDerivative"
                        },
                        {
                            "standardTitle": "Derivative Notation",
                            "standardDescription": "I can the various notation that means the derivative of a function (with respect to x).",
                            "standardExample": `f'(x), f', \\frac{d}{dx}, \\frac{dy}{dx}`,
                            "id": "derivativeNotation"
                        },
                        {
                            "standardTitle": "Derivatives and Continuity",
                            "standardDescription": "I understand that if a function is differentiable at x = c, it is continuous at x = c.",
                            "standardExample": `f'(x), f', \\frac{d}{dx}, \\frac{dy}{dx}`,
                            "id": "derivativeAndContinuity"
                        },
                        {
                            "standardTitle": "Where a Function is Not Differentiable",
                            "standardDescription": "A function is not differentiable where it has a sharp corner, a vertical tangent line, or where it oscillates wildly. These function are not differntiable at x = 0:",
                            "standardExample": `f(x) = \\abs{x}; f(x) = x^{\\frac{1}{3}}; f(x) = x sin\\left(\\frac{1}{x}\\right)`,
                            "id": "notDifferentiable"
                        },
                        {
                            "standardTitle": "Higher Order Derivatives",
                            "standardDescription": "I recognize that the second derivative is the derivative of the first derivative and the third derivative is the derivative of the second derivative. . . ",
                            "standardExample": `f(x) = x^3, f'(x) = 3x^2, f''(x) = 6x; f'''(x) = 6; f^4(x) = 0`,
                            "id": "higherOrderDerivatives"
                        },
                    ]
                },
                {
                    "topicTitle": "Derivatives Rules",
                    "topicDescription": "Rules for finding the derivatives of every type of function.",
                    "id": "derivativesRules",
                    "topicStandards": [
                        {
                            "standardTitle": "Power Rule",
                            "standardDescription": "I can find the derivative of exponential terms.",
                            "standardExample": `\\frac{d}{dx}\\left[x^3\\right] = 3x^2 dx`,
                            "id": "powerRuleConfidenceLevel"
                        },
                        {
                            "standardTitle": "Constant Multiple Rule",
                            "standardDescription": "I can find the derivative of terms that are multiplied by a constant coefficient.",
                            "standardExample": `\\frac{d}{dx}\\left[2x^3\\right] = 2\\frac{d}{dx}\\left[x^3\\right] = 2\\left[3x^2 dx\\right] = 6x^2 dx`,
                            "id": "constantMultipleRuleConfidenceLevel"
                        },
                        {
                            "standardTitle": "Product Rule",
                            "standardDescription": "I can find the derivative of two functions multiplied together.",
                            "standardExample": `\\frac{d}{dx}\\left[x^4 sin x\\right] = \\left(x^4 cos x+ 4x^3 sin x\\right) dx`,
                            "id": "productRuleConfidenceLevel"
                        },
                        {
                            "standardTitle": "Quotient Rule",
                            "standardDescription": "I can find the derivative or a rational function (one that involves division).",
                            "standardExample": `\\frac{d}{dx}\\left[\\frac{x^4}{sin x}\\right] = \\left(\\frac{((sin x)(4x^3)) - ((cos x)(x^4))}{(sin x)^2} \\right)dx = \\left(\\frac{4x^3 sin x - x^4 cos x}{sin^2 x} \\right)dx`,
                            "id": "quotientRuleConfidenceLevel"
                        },
                        {
                            "standardTitle": "Trigonometric Functions",
                            "standardDescription": "I can find the derivative of functions involving the sine, cosine, tangent, cosecant, secant, and cotangent.",
                            "standardExample": `\\frac{d}{dx}\\left[tax x \\right] = sec^2 x dx`,
                            "id": "trigonometricConfidenceLevel"
                        },
                        {
                            "standardTitle": "Chain Rule",
                            "standardDescription": "I can find the derivative of a composite function.",
                            "standardExample": `\\frac{d}{dx}\\left[sin \\left(2x^3\\right)\\right] = sin\\left(2x^3\\right)6x^2 dx`,
                            "id": "chainRuleConfidenceLevel"
                        },
                        {
                            "standardTitle": "Natural Exponential",
                            "standardDescription": "I can find the derivative of functions with e as the base raised to the x power. (This requires the chain rule.)",
                            "standardExample": `\\frac{d}{dx}\\left[e^{3x^2}\\right] = e^{3x^2}6x dx`,
                            "id": "naturalExponentialConfidenceLevel"
                        },
                        {
                            "standardTitle": "Natural Log",
                            "standardDescription": "I can find the derivative of functions involving the natural log. (This requires the chain rule.)",
                            "standardExample": `\\frac{d}{dx}\\left[\\ln(2x^2 + 3)\\right] = \\left(\\frac{4x}{2x^2 + 3}\\right)dx`,
                            "id": "naturalLogConfidenceLevel"
                        },
                        {
                            "standardTitle": "Exponential Functions",
                            "standardDescription": "I can find the derivative of functions with any based raised to the x power. (This requires the chain rule.)",
                            "standardExample": `\\frac{d}{dx}\\left[6^x\\right] = ln(6)6^x dx`,
                            "id": "exponentialConfidenceLevel",
                        },
                        {
                            "standardTitle": "Logarithmic Functions",
                            "standardDescription": "I can find the derivative of functions involving logarithms with any base. (This requires the chain rule.)",
                            "standardExample": `\\frac{d}{dx}\\left[log_4{x}\\right] = \\left(\\frac{1}{ln(4)x}\\right)dx`,
                            "id": "logarithmicConfidenceLevel"
                        },
                        {
                            "standardTitle": "Inverse Functions",
                            "standardDescription": "I can find the derivative of inverse fuctions. (You haven't seen this, p. 178 in your book.)",
                            "standardExample": `\\frac{d}{dx}\\left[f^{-1}(x)\\right] = \\left(\\frac{1}{f'\\left(f^{-1}(x)\\right)}\\right)dx`,
                            "id": "inverseConfidenceLevel"
                        },
                        {
                            "standardTitle": "Inverse Trigonometric Functions",
                            "standardDescription": "I can find the derivative of arcsine, arccosine, and arctangent. (You haven't seen this, p. 179 in your book.)",
                            "standardExample": `\\frac{d}{dx}\\left[sin{-1}x\\right] = \\left(\\frac{1}{\\sqrt{1-x^2}}\\right)dx`,
                            "id": "inverseTrigonometricConfidenceLevel"
                        },
                    ]
                },
                {
                    "topicTitle": "Curve Sketching",
                    "topicDescription": "Use the derivative to analyze the shape and behavior of a function.",
                    "topicId": "curveSketching",
                    "topicStandards": [
                        {

                        },
                    ]
                },
                {
                    "topicTitle": "Particle Motion",
                    "topicDescription": "Use the derivative to analyze straight line movement over time.",
                    "topicId": "particleMotion",
                    "topicStandards": [
                        {

                        },
                    ]
                },
                {
                    "topicTitle": "Related Rates",
                    "topicDescription": "Use the derivative to analyze situations where multiple related variables are changing over time.",
                    "topicId": "relatedRates",
                    "topicStandards": [
                        {

                        },
                    ]                },
            ] // end derivativs standards topics
        }, // end derivatives category object
        {
            "categoryTitle": "Integration",
            "categoryDescrption": "Standards related to the integral and its applications.",
            "id": "integration",
            "topicsArray": [
                {

                },
            ] // end integrationStandardsTopics
        }, // end integration category object
    ]
