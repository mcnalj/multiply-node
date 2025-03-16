import { useState } from "react";
import { Container, Row } from "react-bootstrap";

const skills = [
  { id: 1, name: "Skill 1" },
  { id: 2, name: "Skill 2" },
  { id: 3, name: "Skill 3" },
  { id: 4, name: "Skill 4" },
  { id: 5, name: "Skill 5" },
  { id: 6, name: "Skill 6" },
  { id: 7, name: "Skill 7" },
];

const Pentagon = ({ skill, index, progress, isCurrent }) => {
  const size = 100; // Pentagon size
  const strokeWidth = 5; // Outline thickness
  const colors = {
    active: "darkblue",
    incomplete: "gray",
  };

  const getPentagonPath = () => {
    const angle = (2 * Math.PI) / 5;
    const radius = size / 2;
    return Array.from({ length: 5 })
      .map((_, i) => {
        const x = radius * Math.cos(i * angle - Math.PI / 2);
        const y = radius * Math.sin(i * angle - Math.PI / 2);
        return `${x + radius},${y + radius}`;
      })
      .join(" ");
  };

  // Calculate horizontal shift based on the new layout
  const shiftX = () => {
    const quarterWidth = size / 4; // 1/4 pentagon width
    if (index === 0) return "50%"; // First pentagon in center
    if (index === 1) return `calc(50% + 50px + ${quarterWidth}px)`; // Second pentagon shifted right 1/2 + 1/4 pentagon
    if (index === 2) return `calc(50% + 100px + ${quarterWidth}px)`; // Third pentagon shifted right further
    if (index === 3) return `calc(50% + 50px)`; // Fourth pentagon aligned with second
    if (index === 4) return `calc(50% - 50px)`; // Fifth pentagon aligned with first
    if (index === 5) return `calc(50% - 150px)`; // Sixth pentagon shifted left the same distance as second shifted right
    if (index === 6) return `calc(50% - 50px)`; // Seventh pentagon aligned with first
  };

  // Fill the pentagon sides based on progress
  const getProgressPath = () => {
    const sides = 5; // 5 sides of a pentagon
    const angle = (2 * Math.PI) / sides;
    const radius = size / 2;
    const progressSides = Math.ceil(progress * sides);

    let path = '';
    for (let i = 0; i < progressSides; i++) {
      const x = radius * Math.cos(i * angle - Math.PI / 2);
      const y = radius * Math.sin(i * angle - Math.PI / 2);
      path += `${x + radius},${y + radius} `;
    }

    return path.trim();
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        position: "absolute",
        top: `${index * 120 + 50}px`, // Vertical spacing
        left: shiftX(), // Horizontal shifting based on the index
        transform: "translateX(-50%)",
      }}
    >
      {/* Pentagon Outline */}
      <polygon
        points={getPentagonPath()}
        fill="none"
        stroke={progress > 0 ? colors.active : colors.incomplete}
        strokeWidth={strokeWidth}
      />

      {/* Pentagon Progress */}
      {progress > 0 && (
        <polygon
          points={getProgressPath()}
          fill={colors.active}
          opacity={0.6}
        />
      )}

      {/* Text Label */}
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="black">
        {skill.name}
      </text>
    </svg>
  );
};

const Roadmap = () => {
  const [progress, setProgress] = useState([1, 0.6, 0.3, 0, 0, 0, 0]); // Example progress data

  return (
    <Container className="position-relative" style={{ height: "900px" }}>
      {/* Title */}
      <h2 className="text-center mb-4">Integration</h2>

      <Row className="justify-content-center">
        {skills.map((skill, index) => (
          <Pentagon key={skill.id} skill={skill} index={index} progress={progress[index]} isCurrent={progress[index] > 0 && (progress[index - 1] === 1 || index === 0)} />
        ))}
      </Row>
      




    </Container>
  );
};

export default Roadmap;

