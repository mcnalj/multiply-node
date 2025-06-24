

import React, { useState } from "react";
import "./flashcards.component.gfgFlashcard.scss";
const GFGFlippableCard = () => {
	const cardFront = "Welcome to GFG.";
	const cardBack = "Computer Science Portal.";
	const [isFlipped, setFlipped] = useState(false);

	const handleFlip = () => {
		setFlipped(!isFlipped);
	};

	return (
		<div className="GFGFlash">
			<h1 className="geeks">GeeksforGeeks</h1>
			<h3>React Example for Flip Card Effect</h3>
			<div className="container">
				<div
					className={`flip-card ${
						isFlipped ? "flipped" : ""
					}`}
				>
					<div className="flip-card-inner">
						<div className="flip-card-front">
							<div className="card-content">
								<p>Welcome to GFG</p>
							</div>
							<button
								className="flip-button"
								onClick={handleFlip}
							>
								Flip
							</button>
						</div>
						<div className="flip-card-back">
							<div className="card-content">
								<p>Computer Science Portal</p>
							</div>
							<button
								className="flip-button"
								onClick={handleFlip}
							>
								Flip
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GFGFlippableCard;
