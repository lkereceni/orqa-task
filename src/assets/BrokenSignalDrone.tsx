export const BrokenSignalDrone = () => {
  return (
    <svg
      width="100%"
      viewBox="0 0 680 480"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Broken signal drone illustration</title>
      <desc>
        A quadcopter drone with a broken WiFi signal symbol, indicating lost
        connection
      </desc>
      <defs>
        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.8; }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
            }
            .drone-body { fill: #374151; }
            .drone-arm { fill: #4b5563; }
            .drone-prop { fill: #9ca3af; }
            .signal-wave { stroke: #ee2737; stroke-width: 2; fill: none; }
            .signal-x { stroke: #ee2737; stroke-width: 3; stroke-linecap: round; }
            .shadow { fill: rgba(0, 0, 0, 0.3); }
          `}
        </style>
      </defs>

      <ellipse cx="340" cy="420" rx="80" ry="20" className="shadow" />

      <g style={{ animation: "float 3s ease-in-out infinite" }}>
        <rect
          x="310"
          y="180"
          width="60"
          height="50"
          rx="8"
          className="drone-body"
        />
        <rect
          x="320"
          y="225"
          width="40"
          height="25"
          rx="4"
          className="drone-body"
        />
        <circle cx="340" cy="245" r="6" fill="#1f2937" />

        {/* Front left arm */}
        <rect
          x="280"
          y="190"
          width="35"
          height="12"
          rx="6"
          className="drone-arm"
        />
        <circle cx="275" cy="196" r="10" className="drone-prop" />
        <circle cx="275" cy="196" r="6" fill="#d1d5db" />
        <g transform="translate(275, 196)">
          <ellipse cx="0" cy="0" rx="18" ry="6" fill="#d1d5db" opacity="0.6" />
          <ellipse cx="0" cy="0" rx="6" ry="18" fill="#d1d5db" opacity="0.4" />
        </g>

        {/* Front right arm */}
        <rect
          x="365"
          y="190"
          width="35"
          height="12"
          rx="6"
          className="drone-arm"
        />
        <circle cx="405" cy="196" r="10" className="drone-prop" />
        <circle cx="405" cy="196" r="6" fill="#d1d5db" />
        <g transform="translate(405, 196)">
          <ellipse cx="0" cy="0" rx="18" ry="6" fill="#d1d5db" opacity="0.6" />
          <ellipse cx="0" cy="0" rx="6" ry="18" fill="#d1d5db" opacity="0.4" />
        </g>

        {/* Back left arm */}
        <rect
          x="280"
          y="228"
          width="35"
          height="12"
          rx="6"
          className="drone-arm"
        />
        <circle cx="275" cy="284" r="10" className="drone-prop" />
        <circle cx="275" cy="284" r="6" fill="#d1d5db" />
        <g transform="translate(275, 284)">
          <ellipse cx="0" cy="0" rx="18" ry="6" fill="#d1d5db" opacity="0.6" />
          <ellipse cx="0" cy="0" rx="6" ry="18" fill="#d1d5db" opacity="0.4" />
        </g>

        {/* Back right arm */}
        <rect
          x="365"
          y="228"
          width="35"
          height="12"
          rx="6"
          className="drone-arm"
        />
        <circle cx="405" cy="284" r="10" className="drone-prop" />
        <circle cx="405" cy="284" r="6" fill="#d1d5db" />
        <g transform="translate(405, 284)">
          <ellipse cx="0" cy="0" rx="18" ry="6" fill="#d1d5db" opacity="0.6" />
          <ellipse cx="0" cy="0" rx="6" ry="18" fill="#d1d5db" opacity="0.4" />
        </g>

        <circle cx="330" cy="188" r="3" fill="#ee2737" />
      </g>

      <g style={{ animation: "pulse 1.5s ease-in-out infinite" }}>
        <path d="M 340 120 Q 310 130 290 160" className="signal-wave" />
        <path
          d="M 340 110 Q 300 125 260 175"
          className="signal-wave"
          strokeDasharray="5,5"
          opacity="0.5"
        />
        <path
          d="M 340 100 Q 290 120 230 190"
          className="signal-wave"
          strokeDasharray="3,3"
          opacity="0.3"
        />
      </g>

      <g>
        <line x1="245" y1="110" x2="375" y2="240" className="signal-x" />
        <line x1="375" y1="110" x2="245" y2="240" className="signal-x" />
      </g>

      <circle
        cx="310"
        cy="175"
        r="75"
        fill="none"
        stroke="#ee2737"
        strokeWidth="2"
        strokeDasharray="8,4"
        opacity="0.6"
      />
    </svg>
  );
};
