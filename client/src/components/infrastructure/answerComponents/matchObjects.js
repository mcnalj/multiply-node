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
      leftLatex: `\\frac{4}{x^{-\\frac{1}{3}}}`,
      rightLatex: `4\\sqrt[3]{x}`,
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
  ];

const matchObjectsIntegrals = [
    {
      leftLatex: `\\int_\\quad^\\quad 2x \\quad dx`,
      rightLatex: `x^2+C`,
      level: 1
    },
    {
      leftLatex: `\\int_\\quad^\\quad 3x^2 \\quad dx`,
      rightLatex: `x^3+C`,
      level: 1
    },
    {
      leftLatex: `\\int_\\quad^\\quad x \\quad dx`,
      rightLatex: `\\frac{1}{2}x^2+C`,
      level: 1
    },
    {
      leftLatex: `\\int_\\quad^\\quad 2 \\quad dx`,
      rightLatex: `2x+C`,
      level: 1
    },
    {
      leftLatex: `\\int_\\quad^\\quad 3x \\quad dx`,
      rightLatex: `\\frac{3}{2}x^2+C`,
      level: 1
    },
    {
      leftLatex: `\\int_\\quad^\\quad 1 \\quad dx`,
      rightLatex: `x+C`,
      level: 1
    },
    {
      leftLatex: `\\int_\\quad^\\quad x^2 \\quad dx`,
      rightLatex: `\\frac{1}{3}x^3+C`,
      level: 1
    },
    {
      leftLatex: `\\int_\\quad^\\quad x^3 \\quad dx`,
      rightLatex: `\\frac{1}{4}x^4+C`,
      level: 1
    },
];

const matchObjectsIntegrals2 = [
  {
    leftLatex: `\\int_\\quad^\\quad (x + 3) \\quad dx`,
    rightLatex: `\\frac{1}{2}x^2+3x+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad (3x + 2) \\quad dx`,
    rightLatex: `\\frac{3}{2}x^2+2x+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad (x^2 + 2x) \\quad dx`,
    rightLatex: `\\frac{1}{3}x^3++x^2+C`,
    level: 1
  },    
  {
    leftLatex: `\\int_\\quad^\\quad x \\quad dx`,
    rightLatex: `\\frac{1}{2}x^2+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad 1 \\quad dx`,
    rightLatex: `x+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad x^2 \\quad dx`,
    rightLatex: `\\frac{1}{3}x^3+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad x^3 \\quad dx`,
    rightLatex: `\\frac{1}{4}x^4+C`,
    level: 1
  },
];

const matchObjectsIntegrals3 = [
  {
    leftLatex: `\\int_\\quad^\\quad (x^2 + x + 5) \\quad dx`,
    rightLatex: `\\frac{1}{3}x^3+\\frac{1}{2}x^2+5x+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad (3x^2 + 2x + 1) \\quad dx`,
    rightLatex: `x^3+x^2+x+C`,
    level: 1
  },  
  {
    leftLatex: `\\int_\\quad^\\quad (3x + 2) \\quad dx`,
    rightLatex: `\\frac{3}{2}x^2+2x+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad x \\quad dx`,
    rightLatex: `\\frac{1}{2}x^2+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad 2 \\quad dx`,
    rightLatex: `2x+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad x^2 \\quad dx`,
    rightLatex: `\\frac{1}{3}x^3+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad x^3 \\quad dx`,
    rightLatex: `\\frac{1}{4}x^4+C`,
    level: 1
  }
];

const matchObjectsIntegrals4 = [
  {
    leftLatex: `\\int_\\quad^\\quad \\cos x \\quad dx`,
    rightLatex: `\\sin x+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad -\\sin x \\quad dx`,
    rightLatex: `\\cos x+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad \\sec^2 x \\quad dx`,
    rightLatex: `\\tan x+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad \\sin x \\quad dx`,
    rightLatex: `-\\cos x+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad -\\cos x \\quad dx`,
    rightLatex: `-\\sin x+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad (\\sec x \\tan x) \\quad dx`,
    rightLatex: `\\sec x+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad -(\\csc x \\cot x) \\quad dx`,
    rightLatex: `\\csc x+C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad -(\\sec x tan x) \\quad dx`,
    rightLatex: `-\\sec x + C`,
    level: 1
  },
];

const matchObjectsIntegrals5 = [
  {
    leftLatex: `\\int_\\quad^\\quad e^x \\quad dx`,
    rightLatex: `e^x + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad e^{2x} \\quad dx`,
    rightLatex: `\\frac{1}{2}e^{2x} + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad 2e^{2x} \\quad dx`,
    rightLatex: `e^{2x} + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad \\frac{1}{2}e^{2x} \\quad dx`,
    rightLatex: `\\frac{1}{4}e^{2x} + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad 4e^{2x} \\quad dx`,
    rightLatex: `2e^{2x} + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad 2e^x \\quad dx`,
    rightLatex: `2e^x + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad -e^x \\quad dx`,
    rightLatex: `-e^x + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad e^{-x} \\quad dx`,
    rightLatex: `-e^{-x} + C`,
    level: 1
  },
];

const matchObjectsIntegrals6 = [
  {
    leftLatex: `\\int_\\quad^\\quad \\frac{1}{x} \\quad dx`,
    rightLatex: `\\ln |x| + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad \\frac{1}{x^2} \\quad dx`,
    rightLatex: `-\\frac{1}{x} + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad \\frac{3}{x} \\quad dx`,
    rightLatex: `3 \\ln |x| + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad \\frac{5}{x} \\quad dx`,
    rightLatex: `5 \\ln |x| + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad 2e^{2x} \\quad dx`,
    rightLatex: `e^{2x} + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad 4e^{2x} \\quad dx`,
    rightLatex: `2e^{2x} + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad 2e^x \\quad dx`,
    rightLatex: `2e^x + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad -e^x \\quad dx`,
    rightLatex: `-e^x + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad e^{-x} \\quad dx`,
    rightLatex: `-e^{-x} + C`,
    level: 1
  },
];

const matchObjectsIntegrals7 = [
  {
    leftLatex: `\\int_\\quad^\\quad \\frac{2}{2x + 3} \\quad dx`,
    rightLatex: `\\ln |2x + 3| + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad \\frac{5}{5x + 1} \\quad dx`,
    rightLatex: `-\\frac{1}{5x + 1} + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad \\frac{2x}{x^2 + 7} \\quad dx`,
    rightLatex: `\\ln |x^2 + 7| + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad \\frac{3x^2 + 2}{x^3 + 2x} \\quad dx`,
    rightLatex: `\\ln |x^3 + 2x| + C`,
    level: 1
  },      
  {
    leftLatex: `\\int_\\quad^\\quad \\frac{1}{x} \\quad dx`,
    rightLatex: `\\ln |x| + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad \\frac{1}{x^2} \\quad dx`,
    rightLatex: `-\\frac{1}{x} + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad \\frac{4}{x} \\quad dx`,
    rightLatex: `4 \\ln |x| + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad 4e^{2x} \\quad dx`,
    rightLatex: `2e^{2x} + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad 2e^x \\quad dx`,
    rightLatex: `2e^x + C`,
    level: 1
  },
  {
    leftLatex: `\\int_\\quad^\\quad e^{-x} \\quad dx`,
    rightLatex: `-e^{-x} + C`,
    level: 1
  },
];

export {
  matchObjects,
  matchObjectsIntegrals,
  matchObjectsIntegrals2,
  matchObjectsIntegrals3,
  matchObjectsIntegrals4,
  matchObjectsIntegrals5,
  matchObjectsIntegrals6,
  matchObjectsIntegrals7
}