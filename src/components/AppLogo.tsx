import React, { useState } from 'react';
import logoImg from '../assets/images/yercaud_logo_trimmed.png';

interface AppLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'header';
  showTagline?: boolean;
  variant?: 'light' | 'dark';
  preferVector?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  variant = 'light',
  preferVector = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // Height configurations - scaled up for bold, clear visibility
  const heightClasses = {
    sm: 'h-9 sm:h-10',
    md: 'h-12 sm:h-14 md:h-16',
    header: 'h-11 sm:h-13 md:h-15 lg:h-16 max-h-[64px]',
    lg: 'h-16 sm:h-20',
    xl: 'h-20 sm:h-24',
  };

  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex flex-col justify-center select-none ${className}`}>
      {!preferVector && !imageError ? (
        <img
          src={logoImg}
          alt="123yercaud.com"
          onError={() => setImageError(true)}
          className={`${heightClasses[size]} w-auto object-contain shrink-0`}
        />
      ) : (
        /* Crisp Vector Graphic matching the official 123yercaud.com logo */
        <svg
          viewBox="0 0 540 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${heightClasses[size]} w-auto object-contain max-w-full`}
          aria-label="123yercaud.com Logo"
        >
        <defs>
          {/* Lush green gradient for "yercaud" wordmark */}
          <linearGradient id="yercaudGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#48bb37" />
            <stop offset="45%" stopColor="#2e9b27" />
            <stop offset="100%" stopColor="#156422" />
          </linearGradient>

          {/* Leaf gradient */}
          <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#68d341" />
            <stop offset="100%" stopColor="#1f7a26" />
          </linearGradient>

          {/* Sun Radial Glow Gradient */}
          <radialGradient id="sunGlow" cx="40%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </radialGradient>

          {/* Mountain Facet Light Gradient */}
          <linearGradient id="mtnLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          {/* Mountain Facet Deep Green Gradient */}
          <linearGradient id="mtnDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>

          {/* Bottom Swoosh Gradient */}
          <linearGradient id="swooshGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="35%" stopColor="#22c55e" />
            <stop offset="70%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>
        </defs>

        {/* -------------------- MOUNTAIN & SUN GRAPHIC -------------------- */}
        {/* Golden Sun */}
        <circle cx="410" cy="38" r="21" fill="url(#sunGlow)" />

        {/* Silhouetted Birds in Flight */}
        {/* Bird 1 */}
        <path
          d="M418 24 C421 21 424 23 427 26 C430 23 433 21 436 24 C433 23 430 25 427 28 C424 25 421 23 418 24 Z"
          fill="#1e293b"
        />
        {/* Bird 2 */}
        <path
          d="M433 28 C436 25 439 27 442 30 C445 27 448 25 451 28 C448 27 445 29 442 32 C439 29 436 27 433 28 Z"
          fill="#1e293b"
          transform="scale(0.85) translate(80, 5)"
        />
        {/* Bird 3 */}
        <path
          d="M444 38 C447 35 449 37 452 40 C455 37 457 35 460 38 C457 37 455 39 452 42 C449 39 447 37 444 38 Z"
          fill="#1e293b"
          transform="scale(0.75) translate(145, 14)"
        />

        {/* Mountain Ridge Layers */}
        {/* Base Hill Slope (Deep Green) */}
        <path
          d="M320 82 L345 56 L380 78 L405 36 L430 65 L445 50 L475 75 L500 58 L525 82 Z"
          fill="#14532d"
        />

        {/* Peak 1 (Left Hill) */}
        <polygon points="320,82 345,56 360,82" fill="#15803d" />
        <polygon points="345,56 360,82 355,82" fill="url(#mtnLight)" opacity="0.9" />

        {/* High Peak 2 (Center Left High Mountain) */}
        <polygon points="360,82 390,34 415,82" fill="#16a34a" />
        {/* High Peak Left Face Highlight (Snow/Sun facet) */}
        <polygon points="380,82 390,34 397,55 388,72" fill="#ffffff" opacity="0.95" />
        <polygon points="397,55 390,34 402,62 398,82" fill="url(#mtnLight)" opacity="0.85" />
        {/* High Peak Right Face Shading */}
        <polygon points="390,34 415,82 402,82" fill="#14532d" />

        {/* High Peak 3 (Center Right Mountain) */}
        <polygon points="398,82 425,44 445,82" fill="#15803d" />
        <polygon points="418,82 425,44 430,60 422,82" fill="#ffffff" opacity="0.9" />
        <polygon points="425,44 445,82 438,82" fill="#0f3f22" />

        {/* Peak 4 (Right Mountain Peak) */}
        <polygon points="440,82 465,48 495,82" fill="#16a34a" />
        <polygon points="458,82 465,48 472,66 462,82" fill="#ffffff" opacity="0.85" />
        <polygon points="465,48 495,82 485,82" fill="#14532d" />

        {/* Far Right Ridge */}
        <polygon points="485,82 505,62 525,82" fill="#15803d" />
        <polygon points="500,82 505,62 510,74" fill="url(#mtnLight)" opacity="0.8" />


        {/* -------------------- 123 NUMBERS -------------------- */}
        {/* Number 1: Dark Charcoal, Heavy Slanted */}
        <text
          x="35"
          y="102"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="72"
          letterSpacing="-0.04em"
          fill={isDark ? '#f8fafc' : '#26292d'}
        >
          1
        </text>

        {/* Number 2: Bright Bold Red, Heavy Slanted */}
        <text
          x="75"
          y="102"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="72"
          letterSpacing="-0.04em"
          fill="#dc2626"
        >
          2
        </text>

        {/* Number 3: Dark Charcoal, Heavy Slanted */}
        <text
          x="128"
          y="102"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="72"
          letterSpacing="-0.04em"
          fill={isDark ? '#f8fafc' : '#26292d'}
        >
          3
        </text>


        {/* -------------------- "yercaud" WORDMARK -------------------- */}
        <text
          x="180"
          y="102"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="66"
          letterSpacing="-0.02em"
          fill="url(#yercaudGreen)"
        >
          yercaud
        </text>


        {/* -------------------- TEA LEAVES ON THE 'c' -------------------- */}
        {/* Leaf Stem */}
        <path
          d="M282 68 C283 63 285 58 287 54"
          stroke="#166534"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Left Leaf (sprouting from 'c') */}
        <path
          d="M286 54 C281 48 274 48 271 52 C271 57 279 61 286 54 Z"
          fill="url(#leafGrad)"
          stroke="#15803d"
          strokeWidth="0.8"
        />
        {/* Left Leaf Central Vein */}
        <path
          d="M285 54 C279 51 274 51 272 52"
          stroke="#ffffff"
          strokeWidth="0.7"
          opacity="0.8"
        />

        {/* Right Upward Leaf (larger fresh leaf) */}
        <path
          d="M287 53 C293 42 305 43 307 48 C305 56 295 58 287 53 Z"
          fill="url(#leafGrad)"
          stroke="#15803d"
          strokeWidth="0.8"
        />
        {/* Right Leaf Central Vein */}
        <path
          d="M287 53 C294 48 302 46 306 48"
          stroke="#ffffff"
          strokeWidth="0.7"
          opacity="0.8"
        />


        {/* -------------------- ".com" SUFFIX -------------------- */}
        <text
          x="440"
          y="98"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="42"
          letterSpacing="-0.03em"
          fill={isDark ? '#e2e8f0' : '#26292d'}
        >
          .com
        </text>


        {/* -------------------- SWEEPING GREEN UNDERLINE SWOOSH -------------------- */}
        {/* Smooth, tapered swash curving under the entire brand */}
        <path
          d="M28 107 C75 125 140 127 210 115 C285 102 380 98 475 110 C390 102 290 107 205 120 C140 130 75 124 28 107 Z"
          fill="url(#swooshGrad)"
        />
      </svg>
      )}

      {/* Optional Tagline */}
      {showTagline && (
        <div className="text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase text-slate-500 flex items-center gap-1 mt-0.5 ml-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span>A PLACE TO GET MORE CUSTOMER</span>
        </div>
      )}
    </div>
  );
};
