// Pathway color constants for consistent theming across the hierarchy
export const UNIT_COLORS = {
  summerPrep: '#28a745',    // Green
  limits: '#6f42c1',        // Purple  
  derivatives: '#0056b3',   // Darker Blue
  integrals: '#fd7e14'      // Dark Orange
};

// Helper function to get unit color with fallback
export const getUnitColor = (unit) => {
  return UNIT_COLORS[unit] || '#007bff'; // Default blue fallback
};

// Array of colors in the same order as SectionHome units array
export const UNIT_COLORS_ARRAY = [
  UNIT_COLORS.summerPrep,   // Index 0: Summer Prep
  UNIT_COLORS.limits,       // Index 1: Limits
  UNIT_COLORS.derivatives,  // Index 2: Derivatives
  UNIT_COLORS.integrals     // Index 3: Integrals
];
