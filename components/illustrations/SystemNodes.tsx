'use client';

import { cn } from '@/lib/cn';

type SystemNodesProps = {
  className?: string;
};

const nodes = [
  { cx: 60, cy: 40, r: 6, delay: '0s' },
  { cx: 180, cy: 30, r: 8, delay: '0.4s' },
  { cx: 140, cy: 120, r: 7, delay: '0.8s' },
  { cx: 50, cy: 160, r: 5, delay: '1.2s' },
  { cx: 210, cy: 150, r: 6, delay: '0.6s' },
  { cx: 120, cy: 60, r: 5, delay: '1.0s' },
];

const connections = [
  [0, 1], [0, 5], [1, 5], [1, 2], [2, 4], [2, 3], [3, 0], [5, 2], [4, 1],
];

export function SystemNodes({ className }: SystemNodesProps) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={cn('w-full max-w-[280px]', className)}
      aria-hidden="true"
    >
      {/* Connection lines */}
      {connections.map(([from, to], i) => (
        <line
          key={`line-${i}`}
          x1={nodes[from].cx}
          y1={nodes[from].cy}
          x2={nodes[to].cx}
          y2={nodes[to].cy}
          className="stroke-accent/20"
          strokeWidth="1"
          strokeDasharray="4 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-8"
            dur="3s"
            repeatCount="indefinite"
          />
        </line>
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <g key={`node-${i}`}>
          {/* Glow ring */}
          <circle
            cx={node.cx}
            cy={node.cy}
            r={node.r + 8}
            className="fill-accent/5"
          >
            <animate
              attributeName="r"
              values={`${node.r + 6};${node.r + 12};${node.r + 6}`}
              dur="4s"
              begin={node.delay}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;0.2;0.6"
              dur="4s"
              begin={node.delay}
              repeatCount="indefinite"
            />
          </circle>
          {/* Core */}
          <circle
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            className="fill-accent/30"
          >
            <animate
              attributeName="r"
              values={`${node.r};${node.r + 1.5};${node.r}`}
              dur="4s"
              begin={node.delay}
              repeatCount="indefinite"
            />
          </circle>
          {/* Center dot */}
          <circle
            cx={node.cx}
            cy={node.cy}
            r={2}
            className="fill-accent"
          />
        </g>
      ))}
    </svg>
  );
}
