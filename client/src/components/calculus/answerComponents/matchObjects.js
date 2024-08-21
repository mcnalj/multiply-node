const matchObjects = [
    {
      leftLatex: `x^2`,
      rightLatex: `x \\cdot x`,
      level: 1
    },
    {
      leftLatex: `x^3`,
      rightLatex: `x \\cdot x \\cdot x`,
      level: 1
    },
    {
      leftLatex: `x^1`,
      rightLatex: `x`,
      level: 1
    },
    {
      leftLatex: `x^0`,
      rightLatex: `1`,
      level: 1
    },
    {
      leftLatex: `2^3`,
      rightLatex: `2 \\cdot 2 \\cdot 2`,
      level: 1
    },
    {
      leftLatex: `2^4`,
      rightLatex: `16`,
      level: 1
    },
    {
      leftLatex: `x^4`,
      rightLatex: `x \\cdot x \\cdot x \\cdot x`,
      level: 1
    },
    {
      leftLatex: `5^2`,
      rightLatex: `25`,
      level: 1
    },
    
    // {
    //   leftLatex: `x^2`,
    //   rightLatex: `x \\cdot x`,
    //   level: 1
    // },
    // {
    //   leftLatex: `x^{-1}`,
    //   rightLatex: `\\frac{1}{x}`,
    //   level: 1
    // },
    // {
    //   leftLatex: `x^{-3}`,
    //   rightLatex: `\\frac{1}{x \\cdot x \\cdot x}`,
    //   level: 1
    // },
    // {
    //   leftLatex: `x^{-2}`,
    //   rightLatex: `\\frac{1}{x^2}`,
    //   level: 1
    // },
    // {
    //   leftLatex: `x^0`,
    //   rightLatex: `1 `,
    //   level: 1
    // },
    // {
    //   leftLatex: `x^1`,
    //   rightLatex: `x`,
    //   level: 1
    // },
    // {
    //   leftLatex: `x^4`,
    //   rightLatex: `x \\cdot x \\cdot x \\cdot x`,
    //   level: 1
    // },
    // {
    //   leftLatex: `x^{-4}`,
    //   rightLatex: `\\frac{1}{x^4}`,
    //   level: 1
    // },
    {
      leftLatex: `3^2`,
      rightLatex: `3 \\cdot 3`,
      level: 2
    },
    {
      leftLatex: `4^{-1}`,
      rightLatex: `\\frac{1}{4}`,
      level: 2
    },
    {
      leftLatex: `2^{-3}`,
      rightLatex: `\\frac{1}{2 \\cdot 2 \\cdot 2}`,
      level: 2
    },
    {
      leftLatex: `4^{-2}`,
      rightLatex: `\\frac{1}{16}`,
      level: 2
    },
    {
      leftLatex: `8^1`,
      rightLatex: `8`,
      level: 2
    },
    {
      leftLatex: `5^4`,
      rightLatex: `5 \\cdot 5 \\cdot 5 \\cdot 5`,
      level: 2
    },
    {
      leftLatex: `2^{-4}`,
      rightLatex: `\\frac{1}{2 \\cdot 2 \\cdot 2 \\cdot 2} `,
      level: 2
    },
    {
      leftLatex: `x^{\\frac{1}{2}}`,
      rightLatex: `\\sqrt{x}`,
      level: 3
    },
    {
      leftLatex: `x^{\\frac{1}{3}}`,
      rightLatex: `\\sqrt[3]{x}`,
      level: 3
    },  
    {
      leftLatex: `x^{\\frac{3}{2}}`,
      rightLatex: `\\sqrt{x^3}`,
      level: 3
    },
    {
      leftLatex: `x^{\\frac{4}{3}}`,
      rightLatex: `\\sqrt[3]{x^4}`,
      level: 3
    },
    {
      leftLatex: `x^{-\\frac{3}{2}}`,
      rightLatex: `\\frac{1}{\\sqrt{x^3}}`,
      level: 3
    },
    {
      leftLatex: `x^{-\\frac{1}{2}}`,
      rightLatex: `\\frac{1}{\\sqrt{x}}`,
      level: 4
    },
    {
      leftLatex: `x^{-\\frac{1}{3}}`,
      rightLatex: `\\frac{1}{\\sqrt[3]{x}}`,
      level: 4
    },  
    {
      leftLatex: `x^{-\\frac{4}{3}}`,
      rightLatex: `\\frac{1}{\\sqrt[3]{x^4}}`,
      level: 4
    },
    {
      leftLatex: `3x^{-\\frac{1}{4}}`,
      rightLatex: `\\frac{3}{x^{\\frac{1}{4}}}`,
      level: 4
    },
    {
      leftLatex: `\\frac{1}{x^{-\\frac{1}{3}}}`,
      rightLatex: `\\sqrt[3]{x}`,
      level: 4
    },  
    {
      leftLatex: `\\frac{1}{x^{-\\frac{3}{2}}}`,
      rightLatex: `\\sqrt{x \\cdot x \\cdot x}`,
      level: 4
    },
    {
      leftLatex: `5x^{-\\frac{4}{3}}`,
      rightLatex: `\\frac{5}{\\sqrt[3]{x^4}}`,
      level: 4
    },  
  ]

  export {
    matchObjects
  }