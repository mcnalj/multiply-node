      <svg width="350" height="350" viewBox="0 0 350 350">
        {/* Ring - only show if not clicked */}
        {!isClicked && (
          <circle
            cx="175"
            cy="175"
            r="145"
            fill="none"
            stroke="gold"
            strokeWidth="10"
          >
            {/* Animate the radius */}
            <animate
              attributeName="r"
              values="145;160;145"
              dur="2s"
              repeatCount="indefinite"
            />
            {/* Animate the stroke width */}
            <animate
              attributeName="stroke-width"
              values="10;20;10"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        )}
        
        {/* Blue Circle */}
        <circle
          cx="175"
          cy="175"
          r="140"
          fill="#007bff"
          strokeWidth="2"
          style={{ cursor: 'pointer' }}
          onClick={handleCircleClick}
        >
          {/* Animate shrinking when clicked */}
          {isClicked && (
            <animate
              attributeName="r"
              values="140;70"
              dur="0.5s"
              fill="freeze"
            />
          )}
        </circle>
        
        {/* White Five-Pointed Star */}
        <g transform="translate(175, 175)">
            <g transform="translate(-175, -175)"> 
                {/* Animate shrinking and centering when clicked */}
                {isClicked && (
                    <animateTransform
                    attributeName="transform"
                    type="scale"
                    values="1;0.5"
                    dur="0.5s"
                    fill="freeze"
                    />
                )}       
                <polygon
                    points="175,75 191,135 251,135 205,175 221,235 175,195 129,235 145,175 99,135 159,135"
                    fill="white"
                    stroke="white"
                    strokeWidth="1"
                    style={{ cursor: 'pointer' }}
                    onClick={handleCircleClick}
                />
            </g>
        </g>
      </svg>