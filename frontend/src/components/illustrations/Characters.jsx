import { motion } from 'framer-motion';

// Original flat-vector characters for meritrail. Naive, rounded shapes, no faces.
// Each figure lives in a 220 x 260 box with the ground line near y = 240.

const INK = '#15140F';
const COBALT = '#2B4BD8';
const TOMATO = '#E8442E';
const MUSTARD = '#E2B33A';
const PINK = '#F4A6C0';
const WHITE = '#FFFFFF';
const SKIN = { a: '#C98A5E', b: '#8A5A3C', c: '#F0C4A0', d: '#5E3B28' };

const limb = (color, w = 14) => ({
  stroke: color,
  strokeWidth: w,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fill: 'none',
});

function Frame({ title, className, children, viewBox = '0 0 220 260' }) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
    >
      {children}
    </svg>
  );
}

const Shadow = ({ cx = 110, rx = 60 }) => <ellipse cx={cx} cy="246" rx={rx} ry="8" fill={INK} opacity="0.14" />;

const Paper = ({ x, y, r, w = 28, h = 34, fill = WHITE }) => (
  <g transform={`rotate(${r} ${x + w / 2} ${y + h / 2})`}>
    <rect x={x} y={y} width={w} height={h} rx="3" fill={fill} stroke={INK} strokeWidth="2.5" />
    <path d={`M${x + 6} ${y + 10} h${w - 12} M${x + 6} ${y + 17} h${w - 16} M${x + 6} ${y + 24} h${w - 14}`} stroke={INK} strokeWidth="2" strokeLinecap="round" />
  </g>
);

/** Mid-stride, papers flying everywhere. Used for "No more chaos." */
export function Juggler(props) {
  return (
    <Frame {...props}>
      <Shadow />
      <path d="M102 150 L84 196 L70 236" {...limb(TOMATO, 20)} />
      <path d="M58 240 h24" {...limb(INK, 12)} />
      <path d="M118 150 L138 194 L150 232" {...limb(TOMATO, 20)} />
      <path d="M146 238 h26" {...limb(INK, 12)} />
      <path d="M96 96 L72 124 L62 150" {...limb(SKIN.a, 13)} />
      <rect x="104" y="64" width="15" height="20" rx="6" fill={SKIN.a} />
      <rect x="83" y="80" width="56" height="84" rx="27" fill={COBALT} />
      <path d="M128 96 L152 80 L164 54" {...limb(SKIN.a, 13)} />
      <circle cx="112" cy="50" r="21" fill={SKIN.a} />
      <path d="M90 50 C90 30 108 24 120 28 C130 31 136 40 133 50 C126 44 116 41 106 44 C100 46 94 49 90 50 Z" fill={INK} />
      <Paper x={150} y={24} r={-14} w={34} h={26} />
      <Paper x={22} y={36} r={-22} />
      <Paper x={176} y={92} r={18} fill={PINK} />
      <Paper x={34} y={106} r={14} w={24} h={30} fill={MUSTARD} />
      <Paper x={178} y={0} r={8} w={22} h={26} />
      <path d="M12 82 q8 -6 16 0 M186 64 q6 6 14 2" {...limb(INK, 2.5)} />
    </Frame>
  );
}

/** On tiptoe, reaching up to a badge. Used for "One profile. Every match." */
export function Reacher(props) {
  return (
    <Frame {...props}>
      <Shadow rx={46} />
      <path d="M104 156 L100 200 L100 232" {...limb(COBALT, 20)} />
      <path d="M120 156 L126 200 L128 232" {...limb(COBALT, 20)} />
      <path d="M90 240 l18 -6 M120 240 l20 -6" {...limb(INK, 11)} />
      <path d="M94 104 L72 124 L56 114" {...limb(SKIN.c, 13)} />
      <rect x="105" y="72" width="15" height="20" rx="6" fill={SKIN.c} />
      <rect x="85" y="86" width="54" height="80" rx="26" fill={TOMATO} />
      <path d="M128 98 L142 60 L150 30" {...limb(SKIN.c, 13)} />
      <circle cx="112" cy="60" r="20" fill={SKIN.c} />
      <path d="M92 60 C90 42 104 36 116 38 C128 40 134 50 132 60 C124 52 110 50 92 60 Z" fill={INK} />
      <circle cx="96" cy="40" r="10" fill={INK} />
      <circle cx="168" cy="26" r="22" fill={MUSTARD} stroke={INK} strokeWidth="3" />
      <path d="M158 26 l7 7 l13 -14" {...limb(INK, 4.5)} />
      <circle cx="151" cy="28" r="7" fill={SKIN.c} />
      <path d="M196 14 l8 -4 M198 32 l9 2 M186 52 l6 6" {...limb(INK, 3)} />
    </Frame>
  );
}

/** Sitting on a block, reading a plain-language sheet. Used for "Plain-language eligibility." */
export function Reader(props) {
  return (
    <Frame {...props}>
      <Shadow rx={70} />
      <rect x="54" y="168" width="96" height="72" rx="14" fill={MUSTARD} stroke={INK} strokeWidth="3" />
      <path d="M96 168 L150 168 L158 232" {...limb(COBALT, 20)} />
      <path d="M104 176 L160 178 L172 232" {...limb(COBALT, 20)} />
      <path d="M150 238 h22 M164 238 h22" {...limb(INK, 11)} />
      <rect x="92" y="62" width="15" height="20" rx="6" fill={SKIN.b} />
      <rect x="72" y="80" width="52" height="96" rx="26" fill={PINK} />
      <path d="M86 102 L104 140 L132 140" {...limb(SKIN.b, 13)} />
      <g transform="rotate(8 156 132)">
        <rect x="128" y="96" width="58" height="74" rx="5" fill={WHITE} stroke={INK} strokeWidth="3" />
        <rect x="136" y="106" width="42" height="9" rx="4.5" fill="var(--grass)" />
        <path d="M137 126 h38 M137 136 h30 M137 146 h36 M137 156 h22" {...limb(INK, 2.6)} />
      </g>
      <path d="M112 104 L130 128 L140 124" {...limb(SKIN.b, 13)} />
      <circle cx="100" cy="48" r="20" fill={SKIN.b} />
      <g fill={INK}>
        <circle cx="86" cy="38" r="9" />
        <circle cx="98" cy="30" r="10" />
        <circle cx="112" cy="33" r="9" />
        <circle cx="82" cy="50" r="7" />
      </g>
    </Frame>
  );
}

/** Riding a bike. Used for "Built for every background." */
export function Cyclist(props) {
  return (
    <Frame {...props}>
      <Shadow rx={84} />
      <circle cx="56" cy="204" r="34" fill="none" stroke={INK} strokeWidth="7" />
      <circle cx="168" cy="204" r="34" fill="none" stroke={INK} strokeWidth="7" />
      <circle cx="56" cy="204" r="5" fill={INK} />
      <circle cx="168" cy="204" r="5" fill={INK} />
      <path d="M56 204 L100 204 L142 150 L82 150 Z M100 204 L80 146 M142 150 L168 204 M142 150 L148 132 L162 130" {...limb(TOMATO, 7)} />
      <path d="M70 144 h22" {...limb(INK, 8)} />
      <path d="M86 136 L114 166 L100 204" {...limb(MUSTARD, 17)} />
      <path d="M86 136 L104 156 L116 192" {...limb('#C79A2A', 15)} />
      <path d="M86 136 L120 96" {...limb(COBALT, 42)} />
      <path d="M118 102 L146 120 L160 130" {...limb(SKIN.d, 12)} />
      <circle cx="134" cy="70" r="18" fill={SKIN.d} />
      <path d="M114 68 C114 50 128 44 140 46 C152 48 156 58 154 66 Z" fill={PINK} stroke={INK} strokeWidth="3" />
      <path d="M8 160 h22 M2 180 h18 M10 120 h16" {...limb(INK, 3.5)} />
    </Frame>
  );
}

/** Jumping with both arms up, confetti around. Used for "Ready when you are." */
export function Celebrator(props) {
  return (
    <Frame {...props}>
      <ellipse cx="112" cy="246" rx="40" ry="6" fill={INK} opacity="0.16" />
      <path d="M104 158 L84 188 L100 214" {...limb(COBALT, 19)} />
      <path d="M120 158 L142 184 L128 212" {...limb(COBALT, 19)} />
      <path d="M92 220 l18 -2 M118 218 l18 2" {...limb(INK, 11)} />
      <path d="M98 104 L78 70 L64 36" {...limb(SKIN.c, 13)} />
      <path d="M126 104 L146 70 L160 36" {...limb(SKIN.c, 13)} />
      <circle cx="63" cy="32" r="7.5" fill={SKIN.c} />
      <circle cx="161" cy="32" r="7.5" fill={SKIN.c} />
      <rect x="105" y="74" width="15" height="20" rx="6" fill={SKIN.c} />
      <rect x="86" y="90" width="52" height="78" rx="26" fill={TOMATO} />
      <circle cx="112" cy="62" r="20" fill={SKIN.c} />
      <path d="M92 60 C92 42 106 38 116 40 C126 42 132 50 132 58 C120 52 104 52 92 60 Z" fill={INK} />
      <path d="M130 50 C146 40 152 30 150 18 C160 30 156 48 136 58 Z" fill={INK} />
      <rect x="30" y="70" width="12" height="7" rx="2" fill={MUSTARD} transform="rotate(-24 36 73)" />
      <rect x="180" y="86" width="12" height="7" rx="2" fill={PINK} transform="rotate(30 186 89)" />
      <circle cx="40" cy="128" r="5" fill={COBALT} />
      <circle cx="190" cy="40" r="5" fill={WHITE} stroke={INK} strokeWidth="2" />
      <path d="M100 10 l8 -8 l8 8 Z" fill={MUSTARD} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M176 132 q6 -8 12 0 q6 8 12 0" {...limb(INK, 3)} />
      <path d="M14 30 q6 -8 12 0 q6 8 12 0" {...limb(COBALT, 3.5)} />
      <rect x="62" y="0" width="9" height="9" rx="2" fill={TOMATO} transform="rotate(20 66 4)" />
    </Frame>
  );
}

/** Walking with a backpack and a phone. Used for empty states. */
export function Backpacker(props) {
  return (
    <Frame {...props}>
      <Shadow rx={52} />
      <path d="M104 152 L92 196 L82 236" {...limb(COBALT, 20)} />
      <path d="M118 152 L134 196 L144 234" {...limb(COBALT, 20)} />
      <path d="M70 240 h24 M140 238 h24" {...limb(INK, 12)} />
      <rect x="64" y="88" width="34" height="58" rx="12" fill={MUSTARD} stroke={INK} strokeWidth="3" />
      <rect x="104" y="64" width="15" height="20" rx="6" fill={SKIN.a} />
      <rect x="84" y="80" width="54" height="84" rx="26" fill={PINK} />
      <path d="M92 86 L104 140" {...limb(INK, 5)} />
      <path d="M128 98 L146 120 L152 104" {...limb(SKIN.a, 13)} />
      <rect x="146" y="84" width="16" height="24" rx="4" fill={INK} transform="rotate(10 154 96)" />
      <circle cx="112" cy="50" r="20" fill={SKIN.a} />
      <path d="M92 48 C92 32 106 26 118 28 C128 30 134 38 132 46 C122 40 106 40 92 48 Z" fill={TOMATO} />
      <path d="M126 36 h18" {...limb(TOMATO, 6)} />
    </Frame>
  );
}

/** Hand-drawn style loop used as an overlay accent. */
export function Swoosh({ className, pathProps = {} }) {
  return (
    <svg viewBox="0 0 220 160" className={className} aria-hidden="true" focusable="false" fill="none">
      <motion.path
        d="M168 26 C130 6 50 14 24 56 C2 92 40 140 112 142 C178 144 214 104 200 66 C190 38 150 22 104 26 C84 28 66 34 54 42"
        stroke="var(--coral)"
        strokeWidth="7"
        strokeLinecap="round"
        {...pathProps}
      />
    </svg>
  );
}
